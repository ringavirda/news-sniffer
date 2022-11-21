using Microsoft.EntityFrameworkCore;
using NewsSniffer.Common.Models;

namespace NewsSniffer.Api.Data;

public class DataContext : DbContext
{
    public DataContext()
        : base() { }
    public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }

    public DbSet<Article> Articles => Set<Article>();
    public DbSet<OutletConfig> OutletConfigs => Set<OutletConfig>();

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source=./Data/news.db");
}