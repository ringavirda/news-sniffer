using System.Text.Json;

using Microsoft.EntityFrameworkCore;

using NewsSniffer.Api.Data;
using NewsSniffer.Api.Exceptions;
using NewsSniffer.Common.Models;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Api.Services;

public class AnalyticsService(DataContext dataContext) : IAnalyticsService
{
    private readonly string _analyticsFilePath = Path.Combine("Data", "analytics.json");

    private readonly DataContext _dataContext = dataContext;

    public async Task<Analytics> GetAnalyticsAsync()
    {
        if (File.Exists(_analyticsFilePath))
        {
            var raw = await File.ReadAllTextAsync(_analyticsFilePath);
            return JsonSerializer.Deserialize<Analytics>(raw) ?? new Analytics();
        }
        else
            throw new AnalyticsException("No stored analytics was found. Update analytics.");
    }

    public async Task<Analytics> UpdateAnalyticsAsync()
    {
        var data = await _dataContext.Articles.Select(article =>
            new Tuple<string, DateTime, string>(article.OutletCode, article.Date, article.Prediction)
            ).ToListAsync();

        var analytics = new Analytics();
        foreach (var item in data)
        {
            var daily = new AnalyticsValue
            {
                Positive = item.Item3 == Impressions.Positive ? 1 : 0,
                Negative = item.Item3 == Impressions.Negative ? 1 : 0,
                Neutral = item.Item3 == Impressions.Neutral ? 1 : 0,
            };

            var outlet = analytics.PerTime.FirstOrDefault(outlet => outlet.Outlet == item.Item1);
            if (outlet != null)
            {
                var day = outlet.Daily.FirstOrDefault(day => day.Date.Date == item.Item2.Date);

                if (day != null)
                {
                    analytics.PerTime[analytics.PerTime.IndexOf(outlet)]
                    .Daily[analytics.PerTime[analytics.PerTime.IndexOf(outlet)]
                    .Daily.IndexOf(day)].Value.Add(daily);
                }
                else
                {
                    analytics.PerTime[analytics.PerTime.IndexOf(outlet)]
                    .Daily.Add(new DailyAnalytics
                    {
                        Date = item.Item2.Date,
                        Value = daily
                    });
                }
            }
            else
            {
                analytics.PerTime.Add(new OutletAnalytics
                {
                    Outlet = item.Item1,
                    Daily =
                    [
                        new DailyAnalytics
                        {
                            Date = item.Item2.Date,
                            Value = daily
                        }
                    ]
                });
            }

            analytics.Overall.Add(daily);
        }

        var serialized = JsonSerializer.Serialize<Analytics>(analytics);
        await File.WriteAllTextAsync(_analyticsFilePath, serialized);

        return analytics;
    }
}