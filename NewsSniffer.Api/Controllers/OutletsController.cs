using Microsoft.AspNetCore.Mvc;
using NewsSniffer.Api.Exceptions;
using NewsSniffer.Api.Services;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Controllers;

[ApiController]
[Route("api/outlets")]
public class OutletsController : ControllerBase
{
    private IOutletsService _outletsService;

    public OutletsController(IOutletsService outletsService)
    {
        _outletsService = outletsService;
    }

    // Get
    [HttpGet]
    [Route("")]
    public async Task<ActionResult<List<Outlet>>> GetAll()
    {
        try
        {
            return Ok(await _outletsService.GetAllAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    // Post
    [HttpPost]
    [Route("")]
    public async Task<ActionResult> Create([FromBody] Outlet outlet)
    {
        try
        {
            await _outletsService.CreateAsync(outlet);
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPost]
    [Route("test")]
    public async Task<ActionResult<Article>> PerformTestOnConfig([FromBody] Outlet outlet)
    {
        try
        {
            return Ok(await _outletsService.PerformTestAsync(outlet));
        }
        catch (OutletParserException exception)
        {
            return BadRequest(exception.Message);
        }
    }

    // Put
    [HttpPut]
    [Route("")]
    public async Task<ActionResult> Update([FromBody] Outlet outlet)
    {
        try
        {
            await _outletsService.UpdateAsync(outlet);
            return Ok();
        }
        catch (OutletsException exception)
        {
            return BadRequest(exception.Message);
        }
    }

    // Delete
    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
        try
        {
            await _outletsService.DeleteAsync(id);
            return Ok();
        }
        catch (OutletsException exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpDelete]
    [Route("")]
    public async Task<ActionResult> DeleteAll()
    {
        try
        {
            await _outletsService.DeleteAllAsync();
            return Ok();
        }
        catch (OutletsException exception)
        {
            return BadRequest(exception.Message);
        }
    }
}