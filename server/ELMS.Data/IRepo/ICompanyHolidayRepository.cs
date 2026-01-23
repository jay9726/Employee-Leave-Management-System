

using ELMS.Data.Entity;

namespace ELMS.Data.IRepo
{
    public interface ICompanyHolidayRepository
    {
        Task<IEnumerable<CompanyHoliday>> getAllCompanyHolidaysAsync();

        Task<CompanyHoliday?> getCompanyHolidaysByIdAsync(int id);

        Task<CompanyHoliday?> addCompanyHolidayAsync(CompanyHoliday companyHoliday);

        Task<CompanyHoliday?> updateCompanyHolidayAsync(int id, CompanyHoliday companyHoliday);

        Task<CompanyHoliday?> deleteCompanyHolidayAsync(int id);
    }
}
