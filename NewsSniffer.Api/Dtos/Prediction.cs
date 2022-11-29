namespace NewsSniffer.Api.Dtos;

public class Prediction
{
    public int ArticleId { get; set; }
    public string Conclusion { get; set; } = null!;
}