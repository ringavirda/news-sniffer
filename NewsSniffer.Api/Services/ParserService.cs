using System.Text.RegularExpressions;
using AngleSharp;
using AngleSharp.Dom;
using AngleSharp.Html.Dom;
using NewsSniffer.Api.Exceptions;
using NewsSniffer.Common.Models;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Api.Services;

public class ParserService : IParserService
{
    private IHttpService _httpService;

    public ParserService(IHttpService httpService)
    {
        _httpService = httpService;
    }

    public async Task<Article> ParseArticleFromOutletAsync(Outlet outlet)
    {
        string rawHtml;
        try
        {
            rawHtml = await _httpService.GetRawHtmlAsync(outlet.Link);
        }
        catch (Exception)
        {
            throw new OutletParserException("Unresolvable link");
        }

        var article = new Article();
        try
        {
            var flElement = (await ParseElementsAsync(rawHtml, outlet.FLCS)).FirstOrDefault();
            if (flElement == null) throw new Exception();
            var aElement = (IHtmlAnchorElement)flElement;

            article.OutletCode = outlet.Code;
            article.Title = FilterOut(aElement.Text);
            article.ArticleHref = aElement.Href;
        }
        catch (Exception)
        {
            throw new OutletParserException("Nothing was parsed with FLC selector");
        }

        try
        {
            rawHtml = await _httpService.GetRawHtmlAsync(new Uri(article.ArticleHref));
        }
        catch (Exception)
        {
            throw new OutletParserException("Unresolvable secondary link");
        }

        try
        {
            var slElement = await ParseElementsAsync(rawHtml, outlet.SLCS);

            article.Body = slElement.Any() ? slElement.First().QuerySelectorAll("p")
                .Select(el => el.TextContent)
                .Aggregate((str1, str2) => $"{str1}\n{str2}")
                : throw new Exception();

            article.Body = FilterOut(article.Body);
        }
        catch (Exception)
        {
            throw new OutletParserException("Nothing was parsed with SLC selector");
        }

        try
        {
            var slTime = await ParseElementsAsync(rawHtml, outlet.SLTS);
            article.Date = DateTime.Parse(slTime.First().TextContent);
        }
        catch (Exception)
        {
            throw new OutletParserException("Failed to parse time with SLTS");
        }

        article.Marker = TrainingMarkers.Unmarked;
        article.Impression = Impressions.None;

        return article;
    }

    public async Task<List<Article>> ParseArticlesFromOutletAsync(Outlet config)
    {
        var rawHtml = await _httpService.GetRawHtmlAsync(config.Link);
        var flElements = await ParseElementsAsync(rawHtml, config.FLCS);
        var articles = new List<Article>();

        foreach (var element in flElements)
        {
            var aElement = (IHtmlAnchorElement)element;
            var article = new Article()
            {
                OutletCode = config.Code,
                Title = FilterOut(aElement.TextContent.Trim()),
                ArticleHref = aElement.Href
            };

            rawHtml = await _httpService.GetRawHtmlAsync(new Uri(article.ArticleHref));

            var slElement = await ParseElementsAsync(rawHtml, config.SLCS);
            var slTime = await ParseElementsAsync(rawHtml, config.SLTS);

            article.Body = slElement.Any() ? slElement.First().QuerySelectorAll("p")
                .Select(el => el.TextContent.Trim())
                .Aggregate((str1, str2) => $"{str1}\n{str2}")
                : "None";

            if (article.Body == "None") continue;
            else article.Body = FilterOut(article.Body);

            article.Date = DateTime.Parse(slTime.First().TextContent);

            article.Marker = TrainingMarkers.Unmarked;
            article.Impression = Impressions.None;

            articles.Add(article);
        }

        return articles.DistinctBy(article => article.Title).ToList();
    }

    private string FilterOut(string unfiltered)
        => Regex.Replace(unfiltered, @"[\s\\""]+", " ");

    private async Task<List<IElement>> ParseElementsAsync(string rawHtml, string selector)
    {
        IBrowsingContext context = BrowsingContext.New(Configuration.Default);
        IDocument document = await context.OpenAsync(req => req.Content(rawHtml));

        return document.QuerySelectorAll($"{selector}")
            .ToList();
    }
}