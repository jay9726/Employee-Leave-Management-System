using ELMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Application.IRepositories
{
    public interface IDepartmentRepository
    {
        Task<int> GetDepartmentCountAsync();
        Task<IEnumerable<Department>> GetOnlyDepartmentAsync();
        Task<IEnumerable<Department>> GetAllDepartmentAsync();
        Task<Department?> GetDepartmenByIdAsync(Guid id);
        Task<Department?> AddDepartmentAsync(Department department);
        Task<Department?> UpdateDepartmentAsync(Guid id, Department department);
        Task<Department?> DeleteDepartmentAsync(Guid id);
    }
}
