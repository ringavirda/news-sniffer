namespace NewsSniffer.Api.Exceptions;

[Serializable]
public class OutletParserException : Exception
{
    public OutletParserException() { }
    public OutletParserException(string message) : base(message) { }
    public OutletParserException(string message, System.Exception inner) : base(message, inner) { }
    protected OutletParserException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
}