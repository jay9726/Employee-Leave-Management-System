using ELMS.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Application.IRepositories
{
    public interface IUserRepository
    {
        Task<int> GetEmployeeCountAsync();
        Task<IEnumerable<Employee>> GetAllUserAsync();
        Task<bool> CheckPasswordAsync(Employee employee, string password);
        Task<Employee?> GetUserByEmailAsync(string email);
        Task<Employee?> GetUserByIdAsync(Guid id);
        Task<bool> CreateUserAsync(Employee employee, string password);
        Task<Employee?> UpdateAppUserAsycn(Employee employee);
        Task<Employee?> DeleteUserAsync(Guid id);

        Task<Employee?> ExistEmail(string email);

        Task<List<string>> GetRolesAsync(Employee employee);
    }
}
