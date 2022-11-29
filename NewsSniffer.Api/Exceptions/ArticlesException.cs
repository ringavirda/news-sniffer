namespace NewsSniffer.Api.Exceptions;

[Serializable]
public class ArticlesException : Exception
{
    public ArticlesException() { }
    public ArticlesException(string message) : base(message) { }
    public ArticlesException(string message, System.Exception inner) : base(message, inner) { }
    protected ArticlesException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
}