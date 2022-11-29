using Microsoft.AspNetCore.Mvc;
using NewsSniffer.Api.Dtos;
using NewsSniffer.Api.Services;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Api.Controllers;

[ApiController]
[Route("api/training")]
public class TrainingController : ControllerBase
{
    private ITrainingService _trainingService;

    public TrainingController(ITrainingService trainingService)
    {
        _trainingService = trainingService;
    }

    [HttpGet]
    [Route("config")]
    public ActionResult<List<string>> GetConfig()
    {
        try
        {
            return Ok(_trainingService.GetCurrentConfig());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpPut]
    [Route("config")]
    public async Task<ActionResult> UpdateConfig([FromBody] TrainingConfig config)
    {
        try
        {
            await _trainingService.UpdateConfigAsync(config);
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpGet]
    [Route("selector")]
    public async Task<ActionResult<List<string>>> UpdateSelector()
    {
        try
        {
            return Ok(await _trainingService.UpdateSelectorAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpGet]
    [Route("predict")]
    public async Task<ActionResult<List<Prediction>>> PredictAll()
    {
        try
        {
            return Ok(await _trainingService.PredictAllAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    [HttpGet]
    [Route("train")]
    public async Task<ActionResult<TrainingResponse>> TrainModel()
    {
        try
        {
            return Ok(await _trainingService.TrainModelAsync());
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
}