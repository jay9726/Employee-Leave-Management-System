using ELMS.Data.DB_Connection;
using ELMS.Data.Entity;
using ELMS.Data.IRepo;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ELMS.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DBConenct _dBConenct;
        private readonly UserManager<AppUser> _userManager;

        public UserRepository(DBConenct dBConenct, UserManager<AppUser> userManager)
        {
            _dBConenct = dBConenct;
            _userManager = userManager;
        }



        public async Task<int> GetEmployeeCountAsync() => await _dBConenct.Users.CountAsync();



        public async Task<IEnumerable<AppUser>> GetAllUserAsync() => await _dBConenct.Users.Include(x => x.Department).ToListAsync();



        public async Task<AppUser?> GetUserByIdAsync(int id) => await _dBConenct.Users.Include(x => x.Department).FirstOrDefaultAsync(x => x.Id == id);



        public async Task<AppUser?> GetUserByEmailAsync(string email) => await _userManager.FindByEmailAsync(email);



        public async Task<bool> CheckPasswordAsync(AppUser user, string password) => await _userManager.CheckPasswordAsync(user, password);



        public async Task<bool> CreateUserAsync(AppUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            return result.Succeeded;
        }



        public async Task<AppUser?> UpdateAppUserAsycn(AppUser appUser)
        {
            var user = await _dBConenct.Users.FindAsync(appUser.Id);

            user.FullName = appUser.FullName;
            user.Email = appUser.Email;
            user.DepartmentId = appUser.DepartmentId;
            user.ImagePath = appUser.ImagePath;

            await _userManager.UpdateAsync(user);
            await _dBConenct.SaveChangesAsync();
            return user;
        }



        public async Task<AppUser?> DeleteUserAsync(int id)
        {
            var user = await _dBConenct.Users.FindAsync(id);
            if (user == null) return null;

            var hasRequests = await _dBConenct.LeaveRequests
                .AsNoTracking()
                .AnyAsync(lr => lr.ApplicationId == id);

            if (hasRequests)
            {
                return null;
            }

            await _userManager.DeleteAsync(user);
            await _dBConenct.SaveChangesAsync();
            return user;
        }

    }
}
