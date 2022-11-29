namespace NewsSniffer.Api.Exceptions;

[Serializable]
public class AnalyticsException : Exception
{
    public AnalyticsException() { }
    public AnalyticsException(string message) : base(message) { }
    public AnalyticsException(string message, System.Exception inner) : base(message, inner) { }
    protected AnalyticsException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
}