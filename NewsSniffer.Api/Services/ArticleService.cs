using Microsoft.EntityFrameworkCore;
using NewsSniffer.Api.Data;
using NewsSniffer.Api.Exceptions;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services;

public class ArticleService : IArticleService
{
    private DataContext _dataContext;
    private IParserService _parserService;
    private IOutletsService _outletsService;

    public ArticleService(
        DataContext dataContext,
        IOutletsService outletsService,
        IParserService parserService)
    {
        _dataContext = dataContext;
        _outletsService = outletsService;
        _parserService = parserService;
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
        var configs = await _outletsService.GetAllAsync();
        var newArticles = new List<Article>();
        var titles = await ReadAllTitlesAsync();

        foreach (var config in configs)
            newArticles.AddRange(FilterNew(await _parserService.ParseArticlesFromOutletAsync(config), titles));

        await WriteAllArticlesAsync(newArticles);

        return newArticles;
    }

    private List<Article> FilterNew(List<Article> articles, List<string> titles)
        => articles.Where(article => !titles.Contains(article.Title)).ToList();

    public async Task UpdateArticleAsync(Article article)
    {
        var maybeArticle = await _dataContext.Articles.SingleOrDefaultAsync(o => o.Id == article.Id);
        if (maybeArticle == null) {
            throw new ArticlesException("There is no such article in the database to update");
        } else {
            _dataContext.Articles.Entry(maybeArticle).CurrentValues.SetValues(article);
            await _dataContext.SaveChangesAsync();
        }
    }
}
