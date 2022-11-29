using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services
{
    public interface IOutletsService
    {
        // CRUD Single
        public Task<List<Outlet>> GetAllAsync();
        public Task DeleteAllAsync();

        // CRUD Many
        public Task CreateAsync(Outlet outlet);
        public Task UpdateAsync(Outlet outlet);
        public Task DeleteAsync(int id);

        // Misc
        public Task<Article> PerformTestAsync(Outlet outlet);
    }
}