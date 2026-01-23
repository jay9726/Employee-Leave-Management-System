using ELMS.Data.DB_Connection;
using ELMS.Data.Entity;
using ELMS.Data.IRepo;
using Microsoft.EntityFrameworkCore;

namespace ELMS.Data.Repo
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly DBConenct _dBConenct;

        public DepartmentRepository(DBConenct dBConenct)
        {
            _dBConenct = dBConenct;
        }



        public async Task<int> GetDepartmentCountAsync() => await _dBConenct.Departments.CountAsync();

        public async Task<IEnumerable<Department>> GetOnlyDepartmentAsync() => await _dBConenct.Departments.ToListAsync();

        public async Task<IEnumerable<Department>> GetAllDepartmentAsync(int page)
        {
            var item = 5;
            return await _dBConenct.Departments.Skip((page - 1) * item).Take(item).ToListAsync();
        }



        public async Task<Department?> GetDepartmenByIdAsync(int id) => await _dBConenct.Departments.FindAsync(id);



        public async Task<Department?> AddDepartmentAsync(Department department)
        {
            await _dBConenct.Departments.AddAsync(department);
            await _dBConenct.SaveChangesAsync();
            return department;
        }



        public async Task<Department?> UpdateDepartmentAsync(int id, Department department)
        {
            var findDepartment = await _dBConenct.Departments.FindAsync(id);
            if (findDepartment == null) return null;

            findDepartment.DepartmentName = department.DepartmentName;
            findDepartment.Description = department.Description;
            await _dBConenct.SaveChangesAsync();
            return findDepartment;
        }



        public async Task<Department?> DeleteDepartmentAsync(int id)
        {
            var findDepartment = await _dBConenct.Departments.FindAsync(id);
            if (findDepartment == null) return null;

            _dBConenct.Departments.Remove(findDepartment);
            await _dBConenct.SaveChangesAsync();
            return findDepartment;
        }

    }
}
