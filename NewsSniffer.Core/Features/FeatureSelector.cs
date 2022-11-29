using NewsSniffer.Core.Models;

namespace NewsSniffer.Core.Features;

public class FeatureSelector : IFeatureSelector
{
    private List<string> _termsToExclude;
    private double _similarnessRank;

    internal FeatureSelector(List<string> terms, double similarness)
    {
        _termsToExclude = terms;
        _similarnessRank = similarness;
    }

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
            frequency.Value.RemoveAll(s => _termsToExclude.Contains(s));
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