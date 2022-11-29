using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Dtos;

public class ArticleHeader
{
    public int Id { get; set; }
    public string OutletCode { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Title { get; set; } = null!;
    public string Marker { get; set; } = null!;
    public string Impression { get; set; } = null!;
    public string Prediction { get; set; } = null!;
    
    public static ArticleHeader FromArticle(Article article)
        => new ArticleHeader
        {
            Id = article.Id,
            Date = article.Date,
            OutletCode = article.OutletCode,
            Title = article.Title,
            Marker = article.Marker,
            Impression = article.Impression,
            Prediction = article.Prediction
        };
}