using ELMS.Application.ICommon;
using ELMS.Application.IRepositories;
using ELMS.Persistance.Common;
using ELMS.Persistance.Context;
using ELMS.Persistance.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ELMS.Persistance.Extension
{
    public static class ServiceExtension
    {
        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ELMSContext>(option => option.UseSqlServer(configuration.GetConnectionString("ELMSConnectionString"))
                                  .ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning))); 

            services.AddScoped<IUnitOfWork, UnitOFWork>();

            services.AddScoped<ICompanyHolidayRepository, CompanyHolidayRepository>();
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            services.AddScoped<ILeaveRequestRepository, LeaveRequestRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
