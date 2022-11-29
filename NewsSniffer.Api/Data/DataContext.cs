using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using NewsSniffer.Common.Models;
using NewsSniffer.Core.Models;

namespace NewsSniffer.Api.Data;

public class DataContext : DbContext
{
    public DataContext()
        : base() { }
    public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }

    public DbSet<Article> Articles => Set<Article>();
    public DbSet<Outlet> Outlets => Set<Outlet>();

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source=./Data/news.db");
}