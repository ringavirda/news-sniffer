namespace NewsSniffer.Api.Exceptions;

public class ArticlesException : Exception
{
    public ArticlesException(string message) 
        : base(message)
    { }
}