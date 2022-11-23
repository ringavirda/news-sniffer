
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services;

public interface IArticleService
{
    public Task<List<Article>> ReadAllArticlesAsync();
    public Task WriteAllArticlesAsync(List<Article> articles);
    public Task<List<string>> ReadAllTitlesAsync();
    public Task<List<Article>> UpdateArticlesAsync();
    public Task<Article> ReadArticleByTitleAsync(string title);
    public Task WriteArticleAsync(Article article);
    public Task UpdateArticleAsync(Article article);
}