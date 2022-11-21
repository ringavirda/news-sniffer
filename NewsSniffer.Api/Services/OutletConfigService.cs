using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services;

public class OutletConfigService : IOutletConfigService
{
    private List<OutletConfig> _configs = new List<OutletConfig>();

    public OutletConfigService() {
        _configs.Add(new OutletConfig() {
            OutletCode="unian",
            BaseUri=new Uri("https://www.unian.ua/detail/all_news"),
            FLCC = "a.list-thumbs__title",
            SLTC = "div.time",
            SLCC = "div.article-text"
        });
        _configs.Add(new OutletConfig() {
            OutletCode="tsn",
            BaseUri=new Uri("https://tsn.ua/"),
            FLCC = "a.c-card__link",
            SLTC = "time",
            SLCC = "div.c-article__body"
        });
    }

    public async Task<List<OutletConfig>> GetAllConfigsAsync()
    {
        return _configs;
    }
}