namespace NewsSniffer.Core.Models;

public class NgramViewModel
{
    public int Frequency { get; set; }
    public List<string> Terms { get; set; } = null!;
}