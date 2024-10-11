using System.Collections.Concurrent;

using NewsSniffer.Core.Models;

namespace NewsSniffer.Core.Features;

public static class FeatureSelectorFactory
{
    public static IFeatureSelector GenerateFeatureSecector(TrainingConfig config)
        => new FeatureSelector(config.ExclusionList, config.SimilarnessRank);

    public async static Task<IFeatureSelector> GenerateFeatureSelectorAsync(
        Corpus corpus,
        double cutoff,
        double similarness)
    {
        var uniqueTerms = corpus.GetUniqueTerms();
        var corpusNgrams = corpus.GetAllNgrams();
        var tfMatrix = new double[uniqueTerms.Count, corpus.GetNgramCount()];
        var idfVector = new double[uniqueTerms.Count];
        var ratioDict = new ConcurrentDictionary<string, double>();

        await Task.Run(() =>
        {
            Parallel.For(0, uniqueTerms.Count,
                (i, state) =>
                {
                    idfVector[i] = GetTermIdf(uniqueTerms[i], corpus);

                    for (int j = 0; j < corpus.GetNgramCount(); j++)
                        tfMatrix[i, j] = GetTermTf(uniqueTerms[i], corpusNgrams[j]);
                });


            Parallel.For(0, uniqueTerms.Count,
                (i, state) =>
                {
                    for (int j = 0; j < corpus.GetNgramCount(); j++)
                        ratioDict.AddOrUpdate(
                            uniqueTerms[i],
                            key => 0,
                            (key, old) => old + tfMatrix[i, j] * idfVector[i]);
                });
        });

        var max = ratioDict.Values.Max();

        foreach (var freq in ratioDict)
        {
            ratioDict[freq.Key] = freq.Value / max;
        }

        var excludeList = new List<string>();
        foreach (var ratio in ratioDict)
        {
            if (ratio.Value > cutoff)
                excludeList.Add(ratio.Key);
        }

        var selector = new FeatureSelector(excludeList, similarness);
        return selector;
    }

    private static double GetTermIdf(string term, Corpus corpus)
    {
        var d = corpus.GetAllNgrams()
            .Select(ngram => ngram.ContainsTerm(term) ? 1 : 0).Sum();

        return Math.Log(corpus.GetNgramCount() / (double)d);
    }

    private static double GetTermTf(string term, Ngram ngram)
        => ngram.GetFrequency(term);

}