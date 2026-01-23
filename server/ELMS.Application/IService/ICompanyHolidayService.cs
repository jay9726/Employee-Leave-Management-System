using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.CompanyHolidayDTO;
using ELMS.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Application.IService
{
    public interface ICompanyHolidayService
    {
        Task<APIResponseDTO<IEnumerable<GetCompanyHolidayDTO>>> getAllCompanyHolidaysAsync();

        Task<APIResponseDTO<GetCompanyHolidayDTO?>> getCompanyHolidaysByIdAsync(int id);

        Task<APIResponseDTO<CompanyHoliday?>> addCompanyHolidayAsync(AddCompanyHolidayDTO companyHoliday);
        Task<APIResponseDTO<CompanyHoliday?>> updateCompanyHolidayAsync(int id, AddCompanyHolidayDTO companyHoliday);

        Task<APIResponseDTO<CompanyHoliday?>> deleteCompanyHolidayAsync(int id);
    }
}
