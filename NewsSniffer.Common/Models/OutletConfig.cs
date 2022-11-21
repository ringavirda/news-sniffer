namespace NewsSniffer.Common.Models;

public class OutletConfig
{
    public int Id { get; set; }
    public string OutletCode { get; set; } = null!;
    public Uri BaseUri { get; set; } = null!;
    public string FLCC { get; set; } = null!;
    public string SLTC { get; set; } = null!;
    public string SLCC { get; set; } = null!;
}
