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

    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<List<Outlet>>> GetAllOutlets()
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

    [HttpPost]
    [Route("new")]
    public async Task<ActionResult> CreateNewOutlet([FromBody] Outlet outlet)
    {
        if (ModelState.IsValid)
        {
            await _outletsService.CreateNewAsync(outlet);
            return Ok();
        }
        else
        {
            return BadRequest("Model Invalid");
        }
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<ActionResult> DeleteOutlet([FromRoute] int id)
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

    [HttpPost]
    [Route("update")]
    public async Task<ActionResult> UpdateOutlet([FromBody] Outlet outlet)
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
}