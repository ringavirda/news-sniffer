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
    // Bayas
    public double BayasPositiveGage { get; set; }
    public double BayasNegativeGage { get; set; }
    public string BayasMode { get; set; } = null!;
    public List<Term> BayasDefaultDictionary { get; set; } = new List<Term>();
    public List<Term> BayasTrainedDictionary { get; set; }  = new List<Term>();
}