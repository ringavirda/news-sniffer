using Microsoft.AspNetCore.Mvc;
using NewsSniffer.Api.Services;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Controllers;

[ApiController]
[Route("api/articles")]
public class ArticlesController : ControllerBase
{
    private IArticleService _articleService;

    public ArticlesController(IArticleService articleService)
    {
        _articleService = articleService;
    }

    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<List<Article>>> GetAllArticles()
    {
        return Ok(await _articleService.ReadAllArticlesAsync());
    }

    [HttpPost]
    [Route("update")]
    public async Task<ActionResult<List<Article>>> UpdateArticles()
    {
        return Ok(await _articleService.UpdateArticlesAsync());
    }
}