using ELMS.Application.IService;
using ELMS.Application.Service;
using ELMS.Data.DB_Connection;
using ELMS.Data.Entity;
using ELMS.Data.IRepo;
using ELMS.Data.Repo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<DBConenct>(option =>
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString")));



//Register Identity     
builder.Services.AddIdentity<AppUser, AppUserRole>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
})
    .AddEntityFrameworkStores<DBConenct>()
    .AddDefaultTokenProviders();


// JWT Authentication
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
{
    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            )
    };
});




// Dependancy Injection
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<ILeaveRequestService,LeaveRequestService>();
builder.Services.AddScoped<ILeaveRequestRepository, LeaveRequestRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IForgetPasswordService,ForgetPasswordService>();
builder.Services.AddScoped<ICompanyHolidayService, CompanyHolidayService>();
builder.Services.AddScoped<ICompanyHolidayRepository, CompanyHolidayRepository>();


builder.Services.AddCors(option =>
{
    option.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


builder.Services.AddControllers();


builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    var securitySchema = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer scheme",
    };

    c.AddSecurityDefinition("Bearer", securitySchema);

    //var securityRequirment = new OpenApiSecurityRequirement
    //{
    //    {
    //        new OpenApiSecurityScheme { Reference = new OpenApiReference {Type = ReferenceType.SecurityScheme, Id = "Bearer"}},
    //        new List<string>()
    //    }
    //};

    //c.AddSecurityRequirement(securityRequirment);

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("ReactApp");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();