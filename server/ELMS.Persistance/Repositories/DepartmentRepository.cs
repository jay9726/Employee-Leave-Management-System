using ELMS.Application.IRepositories;
using ELMS.Domain.Entities;
using ELMS.Persistance.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Persistance.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ELMSContext _dbContext;

        public DepartmentRepository(ELMSContext dBContext)
        {
            _dbContext = dBContext;
        }



        public async Task<int> GetDepartmentCountAsync() => await _dbContext.Departments.CountAsync();

        public async Task<IEnumerable<Department>> GetOnlyDepartmentAsync() => await _dbContext.Departments.ToListAsync();

        public async Task<IEnumerable<Department>> GetAllDepartmentAsync()
        {
            //var item = 5;
            //return await _dbContext.Departments.Skip((page - 1) * item).Take(item).ToListAsync();
            return await _dbContext.Departments.ToListAsync();
        }



        public async Task<Department?> GetDepartmenByIdAsync(Guid id) => await _dbContext.Departments.FindAsync(id);



        public async Task<Department?> AddDepartmentAsync(Department department)
        {
            await _dbContext.Departments.AddAsync(department);
            await _dbContext.SaveChangesAsync();
            return department;
        }



        public async Task<Department?> UpdateDepartmentAsync(Guid id, Department department)
        {
            var findDepartment = await _dbContext.Departments.FindAsync(id);
            if (findDepartment == null) return null;

            findDepartment.DepartmentName = department.DepartmentName;
            findDepartment.Description = department.Description;
            await _dbContext.SaveChangesAsync();
            return findDepartment;
        }



        public async Task<Department?> DeleteDepartmentAsync(Guid id)
        {
            var findDepartment = await _dbContext.Departments.FindAsync(id);
            if (findDepartment == null) return null;

            _dbContext.Departments.Remove(findDepartment);
            await _dbContext.SaveChangesAsync();
            return findDepartment;
        }
    }
}
