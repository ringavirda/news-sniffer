using NewsSniffer.Core.Models;

namespace NewsSniffer.Api.Services;

public interface IAnalyticsService
{
    public Task<Analytics> GetAnalyticsAsync();
    public Task<Analytics> UpdateAnalyticsAsync();
}