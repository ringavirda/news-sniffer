using NewsSniffer.Core.Parser;
using NewsSniffer.Core.Parser.Models;

namespace NewsSniffer.Core
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var unianConfig = new OutletConfig
            {
                OutletCode = "unian",
                BaseUri = new Uri(@"https://www.unian.ua/detail/main_news"),
                FirstLevelSelectorClass = "list-thumbs__title",
                SecondLevelSelectorClass = "article-text"
            };
            var contentService = new ContentService();
            contentService.OutletConfig = unianConfig;
            var unianContent = await contentService.ParseContentAsync();
            var logData = unianContent.Select(content => $"{content.OutletCode}\n{content.ArticleHref}\n{content.Title}\n{content.Article}\n")
                .ToArray();
            await File.WriteAllLinesAsync("unian.txt", logData);

            var tsnConfig = new OutletConfig
            {
                OutletCode = "tsn",
                BaseUri = new Uri(@"https://tsn.ua/news"),
                FirstLevelSelectorClass = "c-card__link",
                SecondLevelSelectorClass = "c-article__body"
            };
            contentService.OutletConfig = tsnConfig;
            var tsnContent = await contentService.ParseContentAsync();
            logData = tsnContent.Select(content => $"{content.OutletCode}\n{content.ArticleHref}\n{content.Title}\n{content.Article}\n")
                .ToArray();
            await File.WriteAllLinesAsync("tsn.txt", logData);    
        }
    }
}