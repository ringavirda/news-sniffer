namespace NewsSniffer.Api.Services;

public interface IHttpService
{
    public Task<string> GetRawHtmlAsync(Uri uri);
}