using ELMS.Application.IService;
using ELMS.Application.Service;
using ELMS.Authentication.JWT.EmailService;
using ELMS.Authentication.JWT.Service;
using Microsoft.OpenApi.Models;


namespace ELMS.API.Extension
{
    public static partial class ServiceInitializer
    {
        public static IServiceCollection RegisterApplicationServices(this IServiceCollection services)
        {
            RegisterSwagger(services);

            RegisterCompanyHolidayService(services);

            RegisterDepartmentService(services);

            RegisterLeaveService(services);

            RegisterUserService(services);

            RegisterAuthService(services);

            RegisterJWTService(services);

            RegisterEmailService(services);

            return services;
        }


        private static void RegisterSwagger(IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ELMS API",
                    Version = "v1",
                    Description = "Employee Leave Managment System API"
                });

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter your JWT token below.\r\n\r\nExample: eyJhbGciOiJIUzI1NiIs..."
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id   = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });
        }

        private static void RegisterCompanyHolidayService(IServiceCollection services)
        {
            services.AddScoped<ICompanyHolidayService, CompanyHolidayService>();
        }
        private static void RegisterDepartmentService(IServiceCollection services)
        {
            services.AddScoped<IDepartmentService, DepartmentService>();
        }
        private static void RegisterLeaveService(IServiceCollection services)
        {
            services.AddScoped<ILeaveRequestService, LeaveRequestService>();
        }
        private static void RegisterUserService(IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
        }
        private static void RegisterAuthService(IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
        }
        private static void RegisterJWTService(IServiceCollection services)
        {
            services.AddScoped<IJwtTokenService, JwtTokenService>();
        }

        private static void RegisterEmailService(IServiceCollection services)
        {
            services.AddScoped<IEmailService, EmailService>();
        }
    }
}
