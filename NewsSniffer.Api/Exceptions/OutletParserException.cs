namespace NewsSniffer.Api.Exceptions;

[Serializable]
public class OutletParserException : Exception
{
    public OutletParserException() { }
    public OutletParserException(string message) : base(message) { }
    public OutletParserException(string message, Exception inner) : base(message, inner) { }

}