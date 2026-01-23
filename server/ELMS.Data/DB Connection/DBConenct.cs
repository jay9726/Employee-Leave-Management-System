using ELMS.Data.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;


namespace ELMS.Data.DB_Connection
{
    public class DBConenct : IdentityDbContext<AppUser, AppUserRole, int>
    {
        public DBConenct(DbContextOptions<DBConenct> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.ConfigureWarnings(warnings => warnings.Log(RelationalEventId.PendingModelChangesWarning));
        }


        public DbSet<Department> Departments { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }

        public DbSet<CompanyHoliday> companyHolidays { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<LeaveRequest>()
                .HasOne(lr => lr.AppUser)
                .WithMany(u => u.LeaveRequests)
                .HasForeignKey(lr => lr.ApplicationId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<LeaveRequest>()
                .HasOne(lr => lr.Departments)
                .WithMany(d => d.LeaveRequests)
                .HasForeignKey(lr => lr.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);


            builder.Entity<AppUserRole>().HasData(
                new AppUserRole
                {
                    Id = 1,
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                },

                new AppUserRole
                {
                    Id = 2,
                    Name = "Employee",
                    NormalizedName = "EMPLOYEE",
                }

                );

            var admin = new AppUser
            {
                Id = 1,
                FullName = "Admin",
                Email = "Admin@gmail.com",
                NormalizedEmail = "ADMIN@GMAIL.COM",
                UserName = "Admin",
                NormalizedUserName = "ADMIN",
                SecurityStamp = "X63FRHC6RZPW7UCG3SSK2E3DCOAM7HSJ",
                EmailConfirmed = true,
            };

            var ph = new PasswordHasher<AppUser>();
            admin.PasswordHash = ph.HashPassword(admin, "Admin@123");

            builder.Entity<AppUser>().HasData(admin);

            builder.Entity<IdentityUserRole<int>>().HasData(
              new IdentityUserRole<int>
              {
                  RoleId = 1,
                  UserId = 1
              });

        }
    }
}
