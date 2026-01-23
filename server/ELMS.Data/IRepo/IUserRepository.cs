using ELMS.Data.Entity;
using Microsoft.AspNetCore.Identity;

namespace ELMS.Data.IRepo
{
    public interface IUserRepository
    {
        Task<int> GetEmployeeCountAsync();
        Task<IEnumerable<AppUser>> GetAllUserAsync();
        Task<bool> CheckPasswordAsync(AppUser user, string password);
        Task<AppUser?> GetUserByEmailAsync(string email);
        Task<AppUser?> GetUserByIdAsync(int id);
        Task<bool> CreateUserAsync(AppUser user, string password);
        Task<AppUser?> UpdateAppUserAsycn(AppUser appUser);
        Task<AppUser?> DeleteUserAsync(int id);
    }
}
