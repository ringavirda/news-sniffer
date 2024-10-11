namespace NewsSniffer.Api.Exceptions;

[Serializable]
public class OutletsException : Exception
{
    public OutletsException() { }
    public OutletsException(string message) : base(message) { }
    public OutletsException(string message, Exception inner) : base(message, inner) { }
}