using Microsoft.AspNetCore.Mvc;

using NewsSniffer.Api.Services;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Api.Controllers;

[ApiController]
[Route("api/analytics")]
public class AnalyticsController(IAnalyticsService analyticsService) : ControllerBase
{
    private readonly IAnalyticsService _analyticsService = analyticsService;

    // Get
    [HttpGet]
    [Route("")]
    public async Task<ActionResult<Analytics>> GetAnalyticsAsync()
    {
        try
        {
            return Ok(await _analyticsService.GetAnalyticsAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpGet]
    [Route("update")]
    public async Task<ActionResult<Analytics>> UpdateAnalyticsAsync()
    {
        try
        {
            return Ok(await _analyticsService.UpdateAnalyticsAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
}