using ELMS.Application.ICommon;
using ELMS.Application.IRepositories;
using ELMS.Domain.Entities.Identity;
using ELMS.Persistance.Context;
using ELMS.Persistance.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Persistance.Common
{
    public class UnitOFWork : IUnitOfWork
    {
        private readonly ELMSContext _dBContext;
        private readonly UserManager<Employee> _userManager;

        private readonly Lazy<ICompanyHolidayRepository> _companyHolidayRepository;
        private readonly Lazy<IDepartmentRepository> _departmentRepository;
        private readonly Lazy<ILeaveRequestRepository> _leaveRequestRepository;
        private readonly Lazy<IUserRepository> _userRepository;

        public UnitOFWork(ELMSContext dBContext, UserManager<Employee> userManager )
        {
            _dBContext = dBContext;
            _userManager = userManager;

            _companyHolidayRepository = new Lazy<ICompanyHolidayRepository>(() =>
            new Repositories.CompanyHolidayRepository(_dBContext));

            _departmentRepository = new Lazy<IDepartmentRepository>(() =>
            new Repositories.DepartmentRepository(_dBContext));

            _leaveRequestRepository = new Lazy<ILeaveRequestRepository>(() =>
            new Repositories.LeaveRequestRepository(_dBContext));

            _userRepository = new Lazy<IUserRepository>(() =>
            new Repositories.UserRepository(_dBContext, _userManager));
        }



        public ICompanyHolidayRepository CompanyHolidayRepository => _companyHolidayRepository.Value;
        public IDepartmentRepository DepartmentRepository => _departmentRepository.Value;
        public ILeaveRequestRepository LeaveRequestRepository => _leaveRequestRepository.Value;
        public IUserRepository UserRepository => _userRepository.Value;


        public async Task Save()
        {
            await _dBContext.SaveChangesAsync();
        }

        public void Dispose() {
            _dBContext.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
