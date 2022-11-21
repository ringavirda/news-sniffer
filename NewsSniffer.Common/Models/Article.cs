namespace NewsSniffer.Common.Models;

public class Article
{
    public int Id { get; set; }
    public string OutletCode { get; set; } = null!;
    public DateTime Date {get; set; } 
    public string Title { get; set; } = null!;
    public string ArticleHref { get; set; } = null!;
    public string Body { get; set; } = null!;
}
