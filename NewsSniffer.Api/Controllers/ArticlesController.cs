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
        try
        {
            return Ok(await _articleService.ReadAllArticlesAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPost]
    [Route("update")]
    public async Task<ActionResult<List<Article>>> UpdateArticles()
    {
        try
        {
            return Ok(await _articleService.UpdateArticlesAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPut]
    [Route("update")]
    public async Task<ActionResult> UpdateArticle([FromBody] Article article)
    {
        try
        {
            await this._articleService.UpdateArticleAsync(article);
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
}