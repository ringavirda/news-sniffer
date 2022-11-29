namespace NewsSniffer.Api.Exceptions;

[Serializable]
public class OutletsException : Exception
{
    public OutletsException() { }
    public OutletsException(string message) : base(message) { }
    public OutletsException(string message, System.Exception inner) : base(message, inner) { }
    protected OutletsException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
}