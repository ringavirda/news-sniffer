
using NewsSniffer.Api.Dtos;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services;

public interface IArticlesService
{
    // CRUD Single
    public Task<List<ArticleHeader>> GetAllHeadersAsync();
    public Task<List<string>> GetAllTitlesAsync();
    public Task CreateAllAsync(List<Article> articles);
    public Task UpdateAsync(ArticleHeader article);
    public Task DeleteAsync(int id);
    
    // CRUD Many
    public Task<ArticleFull> GetByIdAsync(int id);
    public Task CreateAsync(Article article);
    public Task DeleteAllAsync();

    // Misc
    public Task<List<ArticleHeader>> UpdateBackendAsync();
}