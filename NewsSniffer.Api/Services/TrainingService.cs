using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using NewsSniffer.Api.Data;
using NewsSniffer.Api.Dtos;
using NewsSniffer.Api.Exceptions;
using NewsSniffer.Common.Models;
using NewsSniffer.Core.Features;
using NewsSniffer.Core.Models;
using NewsSniffer.Core.Prediction;

namespace NewsSniffer.Api.Services;

public class TrainingService : ITrainingService
{
    private readonly string _configFilePath = Path.Combine("Data", "training-conf.json");
    private readonly string _defalutConfigFilePath = Path.Combine("Data", "training-conf-default.json");

    private readonly DataContext _dataContext;

    private TrainingConfig _currentConfig;
    private IFeatureSelector _selector;
    private IPredictionModel _predictionModel;

    public TrainingService(DataContext dataContext)
    {
        _dataContext = dataContext;

        if (File.Exists(_configFilePath))
        {
            var config = File.ReadAllText(_configFilePath);
            _currentConfig = JsonSerializer.Deserialize<TrainingConfig>(config)
                ?? GetDefaultConfig();
        }
        else
            _currentConfig = GetDefaultConfig();

        _selector = FeatureSelectorFactory.GenerateFeatureSecector(_currentConfig);

        if (_currentConfig.Model == "bayas")
            _predictionModel = new NaiveBayesModel();
        else
            _predictionModel = new NaiveBayesModel();
    }

    private TrainingConfig GetDefaultConfig()
    {
        if (!File.Exists(_defalutConfigFilePath))
            throw new TrainingException("Default config file does not exist");

        var defaultConfig = File.ReadAllText(_defalutConfigFilePath);
        return JsonSerializer.Deserialize<TrainingConfig>(defaultConfig)
            ?? throw new TrainingException("Can't deserialize default config");
    }

    public TrainingConfig GetCurrentConfig()
        => _currentConfig;

    public IFeatureSelector GetCurrentSelector()
        => _selector;

    public async Task UpdateConfigAsync(TrainingConfig newConfig)
    {
        newConfig.BayasDefaultDictionary = _currentConfig.BayasDefaultDictionary;
        newConfig.BayasTrainedDictionary = _currentConfig.BayasTrainedDictionary;
        newConfig.ExclusionList = _currentConfig.ExclusionList;

        await File.WriteAllTextAsync(_configFilePath, JsonSerializer.Serialize<TrainingConfig>(newConfig));
        _currentConfig = newConfig;
    }

    public async Task<List<string>> UpdateSelectorAsync()
    {
        var articles = await _dataContext.Articles
            .Select(article => new Tuple<string, string, string>(
                article.OutletCode,
                article.Impression,
                article.Body))
            .ToListAsync();

        _selector = await FeatureSelectorFactory.GenerateFeatureSecectorAsync(
            await Corpus.GenerateCorpusAsync(articles),
            _currentConfig.CutoffRank,
            _currentConfig.SimilarnessRank);
        _currentConfig.ExclusionList = _selector.GetExclusionList();

        await UpdateConfigAsync(_currentConfig);
        return _currentConfig.ExclusionList;
    }

    public async Task<List<Prediction>> PredictAllAsync()
    {
        var articles = await _dataContext.Articles
            .Select(article => new Tuple<int, string>(article.Id, article.Body))
            .ToListAsync();

        _predictionModel.UseGages(_currentConfig.BayasPositiveGage, _currentConfig.BayasNegativeGage);

        if (_currentConfig.BayasMode == "training")
            _predictionModel.UseWeighted(_currentConfig.BayasTrainedDictionary);
        else
            _predictionModel.UseWeighted(_currentConfig.BayasDefaultDictionary);

        List<Prediction> predictions =  new List<Prediction>();
        await Parallel.ForEachAsync(
            articles,
            async (article, token) =>
            {
                predictions.Add(new Prediction
                {
                    ArticleId = article.Item1,
                    Conclusion = await _predictionModel.PredictAsync(_selector.GenerateNgram(article.Item2))
                });
            }
        );

        await _dataContext.Articles.ForEachAsync(article =>
            article.Prediction = predictions.Single(pr => pr.ArticleId == article.Id).Conclusion);
        await _dataContext.SaveChangesAsync();

        return predictions;
    }

    public async Task<List<Article>> PredictAllAsync(List<Article> articles)
    {
        if (_currentConfig.Model == "bayas")
        {
            _predictionModel.UseGages(_currentConfig.BayasPositiveGage, _currentConfig.BayasNegativeGage);

            if (_currentConfig.BayasMode == "training")
                _predictionModel.UseWeighted(_currentConfig.BayasTrainedDictionary);
            else
                _predictionModel.UseWeighted(_currentConfig.BayasDefaultDictionary);


            await Parallel.ForEachAsync(
                articles,
                async (article, token) =>
                {
                    article.Prediction =
                        await _predictionModel.PredictAsync(_selector.GenerateNgram(article.Body));
                }
            );

            return articles;
        }
        else
            throw new TrainingException("Unsupported Model");
    }

    public async Task<TrainingResponse> TrainModelAsync()
    {
        var trainingArticles = await _dataContext.Articles
            .Where(article => article.Marker == TrainingMarkers.Training)
            .Select(article => new Tuple<string, string, string>(
                article.OutletCode,
                article.Impression,
                article.Body))
            .ToListAsync();

        var testingArticles = await _dataContext.Articles
            .Where(article => article.Marker == TrainingMarkers.Testing)
            .Select(article => new Tuple<string, string, string>(
                article.OutletCode,
                article.Impression,
                article.Body))
            .ToListAsync();

        var trainingResult = await _predictionModel.TrainAsync(
            await Corpus.GenerateCorpusAsync(trainingArticles),
            await Corpus.GenerateCorpusAsync(testingArticles)
            );

        _currentConfig.BayasTrainedDictionary = trainingResult.Item2;
        await UpdateConfigAsync(_currentConfig);

        return new TrainingResponse
        {
            Fitness = trainingResult.Item1,
            TrainingArraySize = trainingArticles.Count(),
            TestingArraySize = testingArticles.Count()
        };
    }
}