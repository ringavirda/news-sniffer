using System.Net;

namespace NewsSniffer.Api.Services;

public class HttpService : IHttpService
{
    private HttpClient _httpClient = new HttpClient();

    public async Task<string> GetRawHtmlAsync(Uri uri)
    {
        var response = await _httpClient.GetAsync(uri);

        string rawSource = "None";

        if (response != null && response.StatusCode == HttpStatusCode.OK)
        {
            rawSource = await response.Content.ReadAsStringAsync();
        }

        return rawSource;
    }
}