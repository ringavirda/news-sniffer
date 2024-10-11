using Microsoft.EntityFrameworkCore;
using NewsSniffer.Api.Data;
using NewsSniffer.Api.Exceptions;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services;

public class OutletsService(
    DataContext dataContext, 
    IParserService parserService) : IOutletsService
{
    private readonly DataContext _dataContext = dataContext;
    private readonly IParserService _parserService = parserService;

    public async Task CreateAsync(Outlet outlet)
    {
        await _dataContext.Outlets.AddAsync(outlet);
        await _dataContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var maybeOutlet = 
            await _dataContext.Outlets.FirstOrDefaultAsync(outlet => outlet.Id == id);
        if (maybeOutlet == null)
        {
            throw new OutletsException($"No outlet with id {id} was found");
        }
        else
        {
            _dataContext.Outlets.Remove(maybeOutlet);
            await _dataContext.SaveChangesAsync();
        }
    }
    
    public async Task DeleteAllAsync()
    {
        await _dataContext.Database.ExecuteSqlRawAsync("Delete From Outlets");
        await _dataContext.SaveChangesAsync();
    }

    public async Task<List<Outlet>> GetAllAsync()
        => await _dataContext.Outlets.ToListAsync();

    public async Task<Article> PerformTestAsync(Outlet outlet)
        => await _parserService.ParseArticleFromOutletAsync(outlet);

    public async Task UpdateAsync(Outlet outlet)
    {
        var maybeOutlet = await _dataContext.Outlets.SingleOrDefaultAsync(o => o.Id == outlet.Id);
        if (maybeOutlet == null) {
            throw new OutletsException("There is no such outlet in database to update");
        } else {
            _dataContext.Outlets.Entry(maybeOutlet).CurrentValues.SetValues(outlet);
            await _dataContext.SaveChangesAsync();
        }
    }
}