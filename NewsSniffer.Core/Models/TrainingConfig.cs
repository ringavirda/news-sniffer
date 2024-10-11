namespace NewsSniffer.Core.Models;

[Serializable]
public class TrainingConfig
{
    // Selector
    public double CutoffRank { get; set; }
    public double SimilarnessRank { get; set; }
    public List<string> ExclusionList { get; set; } = new List<string>();
    
    // Model
    public string Model { get; set; } = null!;
    // Bayes
    public double BayesPositiveGage { get; set; }
    public double BayesNegativeGage { get; set; }
    public string BayesMode { get; set; } = null!;
    public List<Term> BayesDefaultDictionary { get; set; } = new List<Term>();
    public List<Term> BayesTrainedDictionary { get; set; }  = new List<Term>();
}