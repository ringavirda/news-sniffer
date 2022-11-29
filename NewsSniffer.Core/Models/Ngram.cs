namespace NewsSniffer.Core.Models;

public class Ngram
{
    public Dictionary<int, List<string>> Value { get; private set; }
        = new Dictionary<int, List<string>>();

    public string? Impression { get; set; }

    public bool ContainsTerm(string term)
    {
        foreach (var frequency in Value)
        {
            if (frequency.Value.Contains(term))
                return true;
        }
        return false;
    }

    public int GetFrequency(string term)
    {
        foreach (var frequency in Value)
        {
            if (frequency.Value.Contains(term))
                return frequency.Key;
        }
        return 0;
    }

    public List<string> GetAllTerms()
        => Value.Values.SelectMany(s => s).ToList();

    public void RemoveTerm(string term)
    {
        foreach (var freq in Value.Values)
            freq.Remove(term);
    }
}