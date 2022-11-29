using NewsSniffer.Api.Dtos;
using NewsSniffer.Common.Models;
using NewsSniffer.Core.Features;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Api.Services;

public interface ITrainingService
{
    public Task UpdateConfigAsync(TrainingConfig config);
    public Task<List<string>> UpdateSelectorAsync();
    public IFeatureSelector GetCurrentSelector();
    public TrainingConfig GetCurrentConfig();
    public Task<List<Prediction>> PredictAllAsync();
    public Task<List<Article>> PredictAllAsync(List<Article> articles);
    public Task<TrainingResponse> TrainModelAsync();
}