using HurricaneAPI.BL;
using HurricaneAPI.Models;
using HurricaneAPI.Services;
using System.Diagnostics;
using HurricaneAPI.Data;
using System;

var CORSAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
string environment = ".Development";
if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Production")
{
    environment = ".Production";
}
Trace.WriteLine($"Starting Quote Center API in {environment} environment.");

builder.Services.Configure<HurricaneDatabaseSettings>(
    builder.Configuration.GetSection("HurricaneDB"));

var configSection = builder.Configuration.GetSection("HurricaneDB");

var allowedCORSUrls = builder.Configuration.GetSection("ApplicationUrls");
var urls = allowedCORSUrls.Get<ApplicationUrls>()?.Urls ?? new List<string>();
if (urls.Count == 0)
{
    Trace.WriteLine($"Quote Center CORS Error: Urls are missing from appsettings{environment}.json");
}

// Add CORS policy to allow for cross-origin resource sharing with browser

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CORSAllowSpecificOrigins,
        policy =>
        {
            urls.ForEach(url => policy.WithOrigins(url));
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.AllowCredentials();
        });
});

builder.Services.AddSingleton<HurricaneService>();

builder.Services.AddTransient <IHurricaneBL, HurricaneBL>();

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors(CORSAllowSpecificOrigins); //UseCors must be called before UseResponseCaching when using UseResponseCaching.

app.UseAuthorization();

app.MapControllers();

app.Run();
