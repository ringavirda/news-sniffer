using System.Text.RegularExpressions;
using AngleSharp;
using AngleSharp.Dom;
using AngleSharp.Html.Dom;
using Microsoft.EntityFrameworkCore;
using NewsSniffer.Api.Data;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services;

public class ArticleService : IArticleService
{
    private DataContext _dataContext;
    private IHttpService _httpService;
    private IOutletConfigService _configService;

    public ArticleService(
        DataContext dataContext,
        IOutletConfigService configService,
        IHttpService httpService)
    {
        _dataContext = dataContext;
        _configService = configService;
        _httpService = httpService;
    }

    public async Task<List<Article>> ReadAllArticlesAsync() 
        => await _dataContext.Articles.ToListAsync();

    public async Task<List<string>> ReadAllTitlesAsync() 
        => await _dataContext.Articles.Select(article => article.Title).ToListAsync();

    public async Task WriteAllArticlesAsync(List<Article> newArticles)
    {
        await _dataContext.Articles.AddRangeAsync(newArticles);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<Article> ReadArticleByTitleAsync(string title) 
        => await _dataContext.Articles.Where(art => art.Title == title).FirstAsync();

    public async Task WriteArticleAsync(Article article)
    {
        await _dataContext.Articles.AddAsync(article);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<List<Article>> UpdateArticlesAsync()
    {
        var configs = await _configService.GetAllConfigsAsync();
        var newArticles = new List<Article>();
        var titles = await ReadAllTitlesAsync();

        foreach (var config in configs)
            newArticles.AddRange(FilterNew(await ParseArticlesAsync(config), titles));

        await WriteAllArticlesAsync(newArticles);

        return newArticles;
    }

    private async Task<List<Article>> ParseArticlesAsync(OutletConfig config)
    {
        var rawHtml = await _httpService.GetRawHtmlAsync(config.BaseUri);
        var flElements = await ParseElementsAsync(rawHtml, config.FLCC);
        var articles = new List<Article>();

        foreach (var element in flElements)
        {
            var aElement = (IHtmlAnchorElement)element;
            var article = new Article()
            {
                OutletCode = config.OutletCode,
                Title = FilterOut(aElement.TextContent),
                ArticleHref = aElement.Href
            };
            
            rawHtml = await _httpService.GetRawHtmlAsync(new Uri(article.ArticleHref));

            var slElement = await ParseElementsAsync(rawHtml, config.SLCC);
            var slTime = await ParseElementsAsync(rawHtml, config.SLTC);

            article.Body = slElement.Any() ? slElement.First().QuerySelectorAll("p")
                .Select(el => el.TextContent)
                .Aggregate((str1, str2) => $"{str1}\n{str2}")
                : "None";

            if (article.Body == "None") continue;
            else article.Body = FilterOut(article.Body);

            article.Date = DateTime.Parse(slTime.First().TextContent);

            articles.Add(article);
        }

        return articles;
    }

    private string FilterOut(string unfiltered) 
        => Regex.Replace(unfiltered, @"[\s\\""]+", " ");

    private List<Article> FilterNew(List<Article> articles, List<string> titles) 
        => articles.Where(article => !titles.Contains(article.Title)).ToList();

    private async Task<List<IElement>> ParseElementsAsync(string rawHtml, string selector)
    {
        IBrowsingContext context = BrowsingContext.New(Configuration.Default);
        IDocument document = await context.OpenAsync(req => req.Content(rawHtml));

        return document.QuerySelectorAll($"{selector}")
            .ToList();
    }
}
