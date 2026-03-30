using ELMS.API.Extension;
using ELMS.API.Filter;
using ELMS.Application.IService;
using ELMS.Application.Service;
using ELMS.Authentication.JWT.Service;
using ELMS.Domain.Entities.Identity;
using ELMS.Persistance.Context;
using ELMS.Persistance.Extension;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

var jwtKey = builder.Configuration["Jwt:Key"];
var connectionString = builder.Configuration.GetConnectionString("ELMSConnectionString");

if (string.IsNullOrWhiteSpace(jwtKey))
    throw new InvalidOperationException(
        "JWT Key is not configured. Set the 'Jwt__Key' environment variable.");

if (string.IsNullOrWhiteSpace(connectionString))
    throw new InvalidOperationException(
        "Database connection string is not configured. Set the 'ELMSConnectionString' environment variable.");



//Register Identity     
builder.Services.RegisterServices(builder.Configuration);
builder.Services.RegisterApplicationServices();
builder.Services.ConfigureCorsPolicy(builder.Configuration);


builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
});




builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidateGuidFilter>();
});



builder.Services.AddIdentity<Employee, Role>(options =>
{
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<ELMSContext>()
    .AddDefaultTokenProviders()
    .AddSignInManager<SignInManager<Employee>>();




builder.Services.AddJwtAuthentication(builder.Configuration);


if (builder.Environment.IsDevelopment())
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}


builder.Services.AddControllers();

var app = builder.Build();


app.ApplyMigrations();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();

}


app.UseCors();

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers["Access-Control-Allow-Origin"] = "*";
        ctx.Context.Response.Headers["Access-Control-Allow-Headers"] = "*";
        ctx.Context.Response.Headers["Access-Control-Allow-Methods"] = "*";
    }
});

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}



//app.UseErrorHandler();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();