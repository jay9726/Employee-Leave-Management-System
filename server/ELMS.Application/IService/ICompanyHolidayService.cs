using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.CompanyHolidayDTO;
using ELMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Application.IService
{
    public interface ICompanyHolidayService
    {
        Task<APIResponseDTO<IEnumerable<GetCompanyHolidayDTO>>> getAllCompanyHolidaysAsync();

        Task<APIResponseDTO<GetCompanyHolidayDTO?>> getCompanyHolidaysByIdAsync(Guid id);

        Task<APIResponseDTO<CompanyHoliday?>> addCompanyHolidayAsync(AddCompanyHolidayDTO companyHoliday);
        Task<APIResponseDTO<CompanyHoliday?>> updateCompanyHolidayAsync(Guid id, AddCompanyHolidayDTO companyHoliday);

        Task<APIResponseDTO<CompanyHoliday?>> deleteCompanyHolidayAsync(Guid id);
    }
}
