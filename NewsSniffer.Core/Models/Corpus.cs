namespace NewsSniffer.Core.Models;

public class Corpus
{
    private Corpus(Dictionary<string, List<(string, string)>> proto)
    {
        OutletsNgrams = ToNgrams(proto);
    }

    public static async Task<Corpus> GenerateCorpusAsync(List<Tuple<string, string, string>> articles)
    {
        Corpus corpus = null!;
        await Task.Run(() =>
        {
            var corpusProto = new Dictionary<string, List<(string, string)>>();

            foreach (var article in articles)
            {
                if (corpusProto.Keys.Contains(article.Item1))
                    corpusProto[article.Item1].Add((article.Item2, article.Item3));
                else
                    corpusProto.Add(article.Item1, new List<(string, string)> { (article.Item2, article.Item3) });

            }
            
            corpus = new Corpus(corpusProto);
        });
        return corpus;
    }

    public Dictionary<string, List<Ngram>> OutletsNgrams { get; private set; }

    public List<string> GetUniqueTerms()
    {
        var terms = new List<string>();

        foreach (var outlet in OutletsNgrams)
        {
            foreach (var ngram in outlet.Value)
            {
                foreach (var frequency in ngram.Value.Values)
                    terms.AddRange(frequency);
            }
        }

        return terms.Distinct().ToList();
    }

    public int GetNgramCount()
        => OutletsNgrams.Values.Select(l => l.Count()).Sum();

    public List<Ngram> GetAllNgrams()
        => OutletsNgrams.Values.SelectMany(ngram => ngram).ToList();

    private Dictionary<string, List<Ngram>> ToNgrams(Dictionary<string, List<(string, string)>> outlets)
    {
        var ngrams = new Dictionary<string, List<Ngram>>();

        foreach (var outlet in outlets.Keys)
            ngrams.Add(outlet, outlets[outlet].Select(raw => {
                var ngram = Utils.ParseNgramFromString(raw.Item2);
                ngram.Impression = raw.Item1;
                return ngram;
            }).ToList());

        return ngrams;
    }
}