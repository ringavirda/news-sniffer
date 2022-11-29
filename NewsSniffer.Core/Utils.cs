using NewsSniffer.Core.Models;

namespace NewsSniffer.Core;

public static class Utils
{
    public static Ngram ParseNgramFromString(string raw)
    {
        raw = new string(raw.Trim().Where(c => char.IsLetter(c) || c == ' ').ToArray());
        var splitted = raw.Split(" ").Where(s => s.Length > 0).Select(w => w.ToLowerInvariant()).ToArray();

        var ngram = new Ngram();
        foreach (var word in splitted)
        {
            var count = splitted.Where(w => w == word).Count();
            if (!ngram.Value.Keys.Contains(count))
                ngram.Value.Add(count, new List<string> { word });
            else 
                ngram.Value[count].Add(word);
        }

        foreach (var freq in ngram.Value)
            ngram.Value[freq.Key] = freq.Value.Distinct().ToList();

        return ngram;
    }

    public static List<NgramViewModel> NgramToViewModels(Ngram ngram)
    {
        var list = new List<NgramViewModel>();
        foreach (var frequency in ngram.Value)
        {
            list.Add(new NgramViewModel {
                Frequency = frequency.Key,
                Terms = frequency.Value
            });
        }
        return list;
    }

    public static double CalculateSimilarity(string source, string target)
    {
        int stepsToSame = ComputeLevenshteinDistance(source, target);

        return (1.0 - ((double)stepsToSame / (double)Math.Max(source.Length, target.Length)));
    }

    private static int ComputeLevenshteinDistance(string source, string target)
    {
        int sourceWordCount = source.Length;
        int targetWordCount = target.Length;

        if (sourceWordCount == 0)
            return targetWordCount;

        if (targetWordCount == 0)
            return sourceWordCount;

        int[,] distance = new int[sourceWordCount + 1, targetWordCount + 1];

        for (int i = 0; i <= sourceWordCount; distance[i, 0] = i++) ;
        for (int j = 0; j <= targetWordCount; distance[0, j] = j++) ;

        for (int i = 1; i <= sourceWordCount; i++)
        {
            for (int j = 1; j <= targetWordCount; j++)
            {
                int cost = (target[j - 1] == source[i - 1]) ? 0 : 1;

                distance[i, j] = Math.Min(Math.Min(distance[i - 1, j] + 1, distance[i, j - 1] + 1), distance[i - 1, j - 1] + cost);
            }
        }

        return distance[sourceWordCount, targetWordCount];
    }
}