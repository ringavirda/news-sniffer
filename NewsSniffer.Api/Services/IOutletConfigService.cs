using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Services
{
    public interface IOutletConfigService
    {
        public Task<List<OutletConfig>> GetAllConfigsAsync();
    }
}