namespace NewsSniffer.Common.Models;

public class Outlet
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Code { get; set; } = null!;
    public Uri Link { get; set; } = null!;
    public string FLCS { get; set; } = null!;
    public string SLCS { get; set; } = null!;
    public string SLTS { get; set; } = null!;
}
