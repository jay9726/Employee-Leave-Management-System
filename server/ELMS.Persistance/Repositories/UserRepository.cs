using ELMS.Application.IRepositories;
using ELMS.Domain.Entities.Identity;
using ELMS.Persistance.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Persistance.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ELMSContext _dbContext;
        private readonly UserManager<Employee> _userManager;

        public UserRepository(ELMSContext dbContext, UserManager<Employee> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }



        public async Task<int> GetEmployeeCountAsync() => await _dbContext.Users.CountAsync();


       
        public async Task<IEnumerable<Employee>> GetAllUserAsync() => await _dbContext.Users.Include(x => x.Department).ToListAsync();



        public async Task<Employee?> GetUserByIdAsync(Guid id) => await _dbContext.Users.Include(x => x.Department).FirstOrDefaultAsync(x => x.Id == id);



        public async Task<Employee?> GetUserByEmailAsync(string email) => await _userManager.FindByEmailAsync(email);

        public async Task<Employee?> ExistEmail(string email) => await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);

        public async Task<bool> CheckPasswordAsync(Employee user, string password) => await _userManager.CheckPasswordAsync(user, password);



        public async Task<bool> CreateUserAsync(Employee user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            return result.Succeeded;
        }



        public async Task<Employee?> UpdateAppUserAsycn(Employee appUser)
        {
            var user = await _dbContext.Users.FindAsync(appUser.Id);

            user.FullName = appUser.FullName;
            user.Email = appUser.Email;
            user.DepartmentId = appUser.DepartmentId;
            user.ImagePath = appUser.ImagePath;

            await _userManager.UpdateAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }



        public async Task<Employee?> DeleteUserAsync(Guid id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null) return null;

            var hasRequests = await _dbContext.LeaveRequests
                .AsNoTracking()
                .AnyAsync(lr => lr.ApplicationId == id);

            if (hasRequests)
            {
                return null;
            }

            await _userManager.DeleteAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }




        public async Task<List<string>> GetRolesAsync(Employee employee)
        {
            var roles = await _userManager.GetRolesAsync(employee);
            return roles.ToList();
        }
    }
}
