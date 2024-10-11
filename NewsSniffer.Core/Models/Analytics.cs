namespace NewsSniffer.Core.Models;

[Serializable]
public class Analytics
{
    public List<OutletAnalytics> PerTime { get; set; } = [];

    public AnalyticsValue Overall { get; set; } = new AnalyticsValue();
}

[Serializable]
public class OutletAnalytics
{
    public string Outlet { get; set; } = null!;
    public List<DailyAnalytics> Daily { get; set; } = [];
}

[Serializable]
public class DailyAnalytics
{
    public DateTime Date { get; set; }
    public AnalyticsValue Value { get; set; } = null!;
}

[Serializable]
public class AnalyticsValue
{
    public int Positive { get; set; }
    public int Negative { get; set; }
    public int Neutral { get; set; }

    public void Add(AnalyticsValue analyticsValue)
    {
        Positive += analyticsValue.Positive;
        Negative += analyticsValue.Negative;
        Neutral += analyticsValue.Neutral;
    }
}