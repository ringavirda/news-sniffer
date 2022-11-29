using System.Collections.Concurrent;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Core.Prediction;

public class NaiveBayesModel : IPredictionModel
{
    private List<Term> _weightedTerms = new List<Term>();
    private double _positiveGage = 10;
    private double _negativeGage = -10;

    public async Task<string> PredictAsync(Ngram ngram)
        => await PredictAsync(ngram, _weightedTerms);

    public async Task<string> PredictAsync(Ngram ngram, List<Term> weighted)
    {
        var weightedTerms = new ConcurrentDictionary<string, double>();

        Parallel.ForEach(
            ngram.Value,
            (freq, token) =>
            {
                foreach (var term in freq.Value)
                {
                    var maybeWeighted = _weightedTerms.Where(
                        t => Utils.CalculateSimilarity(term, t.Value) > 0.7
                        ).ToList();

                    if (maybeWeighted.Any())
                    {
                        weightedTerms.AddOrUpdate(
                            term,
                            (key) => maybeWeighted.First().Impression * Math.Sqrt(freq.Key),
                            (key, old) => maybeWeighted.First().Impression * Math.Sqrt(freq.Key));
                    }
                }
            }
        );

        if (!weightedTerms.Any())
            return Impressions.Neuteral;

        var conclusion = weightedTerms.DistinctBy(t => t.Key)
            .Select(t => t.Value).Sum();

        if (conclusion > _positiveGage)
            return Impressions.Positive;
        if (conclusion > _negativeGage)
            return Impressions.Neuteral;
        else
            return Impressions.Negative;
    }

    public async Task<(double, List<Term>)> TrainAsync(Corpus training, Corpus testing)
    {
        var ngrams = training.GetAllNgrams();
        var ngramsCount = ngrams.Count();
        var positiveNgrams = ngrams.Where(ngram => ngram.Impression == Impressions.Positive).ToList();
        var negativeNgrams = ngrams.Where(ngram => ngram.Impression == Impressions.Negative).ToList();

        var weighted = new List<Term>();
        await Parallel.ForEachAsync<string>(
            training.GetUniqueTerms(),
            async (term, token) =>
            {
                var positiveValue = positiveNgrams.Where(ngram =>
                    ngram.ContainsTerm(term)
                    ).Count() / (double)ngramsCount;
                var negativeValue = negativeNgrams.Where(ngram =>
                    ngram.ContainsTerm(term)
                    ).Count() / (double)ngramsCount;

                weighted.Add(new Term
                {
                    Value = term,
                    Impression = positiveValue - negativeValue
                });
            });

        var max = weighted.Max(term => term.Impression);
        weighted = weighted.Select(term => new Term
        {
            Value = term.Value,
            Impression = term.Impression = term.Impression / max
        }).Where(term => Math.Abs(term.Impression) > 0.6).ToList();

        int correct = 0;
        await Parallel.ForEachAsync(
            testing.GetAllNgrams(),
            async (ngram, token) =>
            {
                if (ngram.Impression == await PredictAsync(ngram, weighted))
                    correct++;
            });

        return (correct / (double)testing.GetAllNgrams().Count(), weighted);
    }

    public void UseWeighted(List<Term> weighted)
    {
        _weightedTerms = weighted;
    }

    public void UseGages(double positive, double negative)
    {
        _positiveGage = positive;
        _negativeGage = negative;
    }
}