namespace NewsSniffer.Api.Exceptions;

[Serializable]
public class AnalyticsException : Exception
{
    public AnalyticsException() { }
    public AnalyticsException(string message) : base(message) { }
    public AnalyticsException(string message, Exception inner) : base(message, inner) { }
}