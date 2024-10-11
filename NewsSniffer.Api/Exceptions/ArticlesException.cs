namespace NewsSniffer.Api.Exceptions;

[Serializable]
public class ArticlesException : Exception
{
    public ArticlesException() { }
    public ArticlesException(string message) : base(message) { }
    public ArticlesException(string message, Exception inner) : base(message, inner) { }
}