using ELMS.Data.Entity;

namespace ELMS.Data.IRepo
{
    public interface IDepartmentRepository
    {
        Task<int> GetDepartmentCountAsync();
        Task<IEnumerable<Department>> GetOnlyDepartmentAsync();
        Task<IEnumerable<Department>> GetAllDepartmentAsync(int page);
        Task<Department?> GetDepartmenByIdAsync(int id);
        Task<Department?> AddDepartmentAsync(Department department);
        Task<Department?> UpdateDepartmentAsync(int id, Department department);
        Task<Department?> DeleteDepartmentAsync(int id);
    }
}
