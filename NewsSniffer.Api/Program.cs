using Microsoft.AspNetCore.Authentication.Certificate;
using Microsoft.EntityFrameworkCore;
using NewsSniffer.Api.Data;
using NewsSniffer.Api.Services;

var AllowSpecificOrigins = "_AllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: AllowSpecificOrigins,
              policy =>
              {
                  policy.WithOrigins("http://localhost:4200/")
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                    .AllowAnyHeader();
              });
    });

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(
    CertificateAuthenticationDefaults.AuthenticationScheme)
.AddCertificate();

builder.Services.AddSingleton<IHttpService, HttpService>();
builder.Services.AddScoped<IOutletsService, OutletsService>();
builder.Services.AddScoped<IArticlesService, ArticlesService>();
builder.Services.AddScoped<ITrainingService, TrainingService>();
builder.Services.AddScoped<IAnalyticsService, AnalyticsService>();
builder.Services.AddSingleton<IParserService, ParserService>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(AllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
