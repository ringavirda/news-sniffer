using NewsSniffer.Core.Models;

namespace NewsSniffer.Core.Features;

public class FeatureSelector(List<string> terms, double similarness) : IFeatureSelector
{
    private readonly List<string> _termsToExclude = terms;
    private readonly double _similarnessRank = similarness;

    public List<string> GetExclusionList()
        => _termsToExclude;


    public Ngram GenerateNgram(string body)
    {
        var rawNgram = Utils.ParseNgramFromString(body);

        var selected = Select(rawNgram);

        return selected;
    }

    public Ngram Select(Ngram ngram)
    {
        // Apply exclusion list
        foreach (var frequency in ngram.Value)
        {
            frequency.Value.RemoveAll(_termsToExclude.Contains);
        }

        // Minimize
        foreach (var term in ngram.GetAllTerms())
        {
            foreach (var termToCompare in ngram.GetAllTerms())
            {
                if (term != termToCompare
                    && Utils.CalculateSimilarity(term, termToCompare) > _similarnessRank)
                    ngram.RemoveTerm(termToCompare);
            }
        }

        foreach (var freq in ngram.Value)
        {
            if (freq.Value.Count == 0)
                ngram.Value.Remove(freq.Key);
        }

        return ngram;
    }
}