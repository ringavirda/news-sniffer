using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services;

public interface IParserService
{
    public Task<Article> ParseArticleFromOutletAsync(Outlet config);
    public Task<List<Article>> ParseArticlesFromOutletAsync(Outlet config);
}