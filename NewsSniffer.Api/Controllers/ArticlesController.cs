using Microsoft.AspNetCore.Mvc;

using NewsSniffer.Api.Dtos;
using NewsSniffer.Api.Services;

namespace NewsSniffer.Api.Controllers;

[ApiController]
[Route("api/articles")]
public class ArticlesController(IArticlesService articlesService) : ControllerBase
{
    private readonly IArticlesService _articlesService = articlesService;

    // Get
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<ArticleFull>> GetFullArticle([FromRoute] int id)
    {
        try
        {
            return Ok(await _articlesService.GetByIdAsync(id));
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpGet]
    [Route("")]
    public async Task<ActionResult<List<ArticleHeader>>> GetAllArticles()
    {
        try
        {
            return Ok(await _articlesService.GetAllHeadersAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpGet]
    [Route("update")]
    public async Task<ActionResult<List<ArticleFull>>> UpdateArticles()
    {
        try
        {
            return Ok(await _articlesService.UpdateBackendAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    // Post


    // Put
    [HttpPut]
    [Route("")]
    public async Task<ActionResult> UpdateArticle([FromBody] ArticleHeader article)
    {
        try
        {
            await _articlesService.UpdateAsync(article);
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    // Delete
    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> DeleteAllArticles([FromRoute] int id)
    {
        try
        {
            await _articlesService.DeleteAsync(id);
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpDelete]
    [Route("")]
    public async Task<ActionResult> DeleteAllArticles()
    {
        try
        {
            await _articlesService.DeleteAllAsync();
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
}