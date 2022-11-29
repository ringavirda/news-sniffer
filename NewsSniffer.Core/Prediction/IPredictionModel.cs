using NewsSniffer.Core.Models;

namespace NewsSniffer.Core.Prediction;

public interface IPredictionModel
{
    public Task<string> PredictAsync(Ngram ngram);
    public Task<(double, List<Term>)> TrainAsync(Corpus training, Corpus testing);
    public void UseWeighted(List<Term> weighted);
    public void UseGages(double positiveGage, double negativeGage);
}