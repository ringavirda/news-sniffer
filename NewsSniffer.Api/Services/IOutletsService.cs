using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services
{
    public interface IOutletsService
    {
        public Task CreateNewAsync(Outlet outlet);
        public Task DeleteAsync(int id);
        public Task<List<Outlet>> GetAllAsync();
        public Task<Article> PerformTestAsync(Outlet outlet);
        public Task UpdateAsync(Outlet outlet);
    }
}