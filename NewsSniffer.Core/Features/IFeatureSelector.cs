using NewsSniffer.Core.Models;

namespace NewsSniffer.Core.Features;

public interface IFeatureSelector
{
    public Ngram GenerateNgram(string body);
    public Ngram Select(Ngram ngram);
    public List<string> GetExclusionList();
}