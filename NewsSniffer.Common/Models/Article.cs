namespace NewsSniffer.Common.Models;

public class Article
{
    public int Id { get; set; }
    // Header
    public string OutletCode { get; set; } = null!;
    public DateTime Date { get; set; }
    // Main
    public string Title { get; set; } = null!;
    public string ArticleHref { get; set; } = null!;
    public string Body { get; set; } = null!;
    // Analysis
    public string Marker { get; set; } = null!;
    public string Impression { get; set; } = null!;
}
