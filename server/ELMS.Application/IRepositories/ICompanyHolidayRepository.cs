using ELMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Application.IRepositories
{
    public interface ICompanyHolidayRepository
    {
        Task<IEnumerable<CompanyHoliday>> getAllCompanyHolidaysAsync();

        Task<CompanyHoliday?> getCompanyHolidaysByIdAsync(Guid id);

        Task<CompanyHoliday?> addCompanyHolidayAsync(CompanyHoliday companyHoliday);

        Task<CompanyHoliday?> updateCompanyHolidayAsync(Guid id, CompanyHoliday companyHoliday);

        Task<CompanyHoliday?> deleteCompanyHolidayAsync(Guid id);
    }
}
