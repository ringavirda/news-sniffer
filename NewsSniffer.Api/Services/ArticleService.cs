using Microsoft.EntityFrameworkCore;
using NewsSniffer.Api.Data;
using NewsSniffer.Api.Dtos;
using NewsSniffer.Api.Exceptions;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services;

public class ArticlesService(
    DataContext dataContext,
    IOutletsService outletsService,
    ITrainingService trainingService,
    IParserService parserService) : IArticlesService
{
    private readonly DataContext _dataContext = dataContext;
    private readonly IParserService _parserService = parserService;
    private readonly IOutletsService _outletsService = outletsService;
    private readonly ITrainingService _trainingService = trainingService;

    // CRUD Single
    public async Task<ArticleFull> GetByIdAsync(int id)
    {
        var article = await _dataContext.Articles.SingleOrDefaultAsync(article => article.Id == id);
        if (article == null)
            throw new ArticlesException($"There is no article with id={id} in the database");
        else
            return ArticleFull.FromArticle(article, _trainingService.GetCurrentSelector());
    }

    public async Task CreateAsync(Article article)
    {
        await _dataContext.Articles.AddAsync(article);
        await _dataContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(ArticleHeader article)
    {
        var maybeArticle = 
            await _dataContext.Articles.SingleOrDefaultAsync(o => o.Id == article.Id);
        if (maybeArticle == null)
        {
            throw new ArticlesException("There is no such article in the database to update");
        }
        else
        {
            _dataContext.Articles.Entry(maybeArticle).CurrentValues.SetValues(new Article
            {
                Id = article.Id,
                ArticleHref = maybeArticle.ArticleHref,
                Body = maybeArticle.Body,
                Date = article.Date,
                Impression = article.Impression,
                Marker = article.Marker,
                OutletCode = article.OutletCode,
                Prediction = article.Prediction,
                Title = article.Title
            });
            await _dataContext.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync(int id)
    {
        var maybeArticle = await _dataContext.Articles.FirstOrDefaultAsync(article => article.Id == id);
        if (maybeArticle == null)
        {
            throw new ArticlesException($"No article with id {id} was found");
        }
        else
        {
            _dataContext.Articles.Remove(maybeArticle);
            await _dataContext.SaveChangesAsync();
        }
    }

    // CRUD Many
    public async Task<List<ArticleHeader>> GetAllHeadersAsync()
        => await _dataContext.Articles
            .Select(article => ArticleHeader.FromArticle(article))
            .ToListAsync();

    public async Task<List<string>> GetAllTitlesAsync()
        => await _dataContext.Articles.Select(article => article.Title).ToListAsync();

    public async Task CreateAllAsync(List<Article> newArticles)
    {
        await _dataContext.Articles.AddRangeAsync(newArticles);
        await _dataContext.SaveChangesAsync();
    }

    public async Task DeleteAllAsync()
    {
        await _dataContext.Database.ExecuteSqlRawAsync("Delete From Articles");
        await _dataContext.SaveChangesAsync();
    }

    // Misc
    public async Task<List<ArticleHeader>> UpdateBackendAsync()
    {
        var configs = await _outletsService.GetAllAsync();
        var newArticles = new List<Article>();
        var titles = await GetAllTitlesAsync();

        foreach (var config in configs)
            newArticles.AddRange(FilterNew(
                await _parserService.ParseArticlesFromOutletAsync(config), titles));

        newArticles = await _trainingService.PredictAllAsync(newArticles);
        await CreateAllAsync(newArticles);

        return newArticles.Select(ArticleHeader.FromArticle).ToList();
    }

    // Private
    private List<Article> FilterNew(List<Article> articles, List<string> titles)
        => articles.Where(article => !titles.Contains(article.Title)).ToList();
}
