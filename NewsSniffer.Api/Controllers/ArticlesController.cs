using Microsoft.AspNetCore.Mvc;
using NewsSniffer.Api.Dtos;
using NewsSniffer.Api.Services;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Controllers;

[ApiController]
[Route("api/articles")]
public class ArticlesController : ControllerBase
{
    private IArticlesService _articlesService;

    public ArticlesController(IArticlesService articlesService)
    {
        _articlesService = articlesService;
    }

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
            await this._articlesService.UpdateAsync(article);
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
            await this._articlesService.DeleteAsync(id);
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
            await this._articlesService.DeleteAllAsync();
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
}