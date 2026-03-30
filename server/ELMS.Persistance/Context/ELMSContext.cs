using ELMS.Domain.Entities;
using ELMS.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ELMS.Persistance.Context
{
    public class ELMSContext : IdentityDbContext<Employee, Role, Guid>
    {
        public ELMSContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }

        public DbSet<CompanyHoliday> CompanyHolidays { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<LeaveRequest>()
                .HasOne(lr => lr.Employee)
                .WithMany(u => u.LeaveRequests)
                .HasForeignKey(lr => lr.ApplicationId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<LeaveRequest>()
                .HasOne(lr => lr.Departments)
                .WithMany(d => d.LeaveRequests)
                .HasForeignKey(lr => lr.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);


            var adminRoleId = Guid.Parse("9b1c5c87-9e42-4f83-9d6c-1c7e2a1b4f11");
            var EmployeeRoleId = Guid.Parse("2f7e91a4-6c83-41a5-8b93-94c3e2d7a111");
            var adminId = Guid.Parse("a1b2c3d4-e5f6-7890-abcd-ef1234567890");

            builder.Entity<Role>().HasData(
                new Role
                {
                    Id = adminRoleId,
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "d3f1a2b4-11c0-4e8a-9f7d-2c3e5a6b8d90"
                },

                new Role
                {
                    Id = EmployeeRoleId,
                    Name = "Employee",
                    NormalizedName = "EMPLOYEE",
                    ConcurrencyStamp = "c1e4a6b8-44f7-4d8c-0b2e-5f7a9c1d3e65"
                });


            builder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = adminId,
                    FullName = "Admin",
                    Email = "Admin@gmail.com",
                    NormalizedEmail = "ADMIN@GMAIL.COM",
                    UserName = "Admin",
                    NormalizedUserName = "ADMIN",
                    PasswordHash = "AQAAAAIAAYagAAAAEH3yBmSbGzpOoMRKAGOmSHMj0PYiToJwSbbDWqSXGhpkW/Wr4HaGjMkJkCBIkFkBpQ==",
                    SecurityStamp = "X63FRHC6RZPW7UCG3SSK2E3DCOAM7HSJ",
                    EmailConfirmed = true,
                }
                );

            builder.Entity<IdentityUserRole<Guid>>().HasData(
                new IdentityUserRole<Guid> { UserId = adminId, RoleId = adminRoleId }
                );
        }
    }
}
