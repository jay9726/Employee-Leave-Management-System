using ELMS.Data.DB_Connection;
using ELMS.Data.Entity;
using ELMS.Data.IRepo;
using Microsoft.EntityFrameworkCore;

namespace ELMS.Data.Repo
{
    public class CompanyHolidayRepository : ICompanyHolidayRepository
    {
        private readonly DBConenct _dbConenct;

        public CompanyHolidayRepository(DBConenct dBConenct)
        {
            _dbConenct = dBConenct;
        }



        public async Task<IEnumerable<CompanyHoliday>> getAllCompanyHolidaysAsync() => await _dbConenct.companyHolidays.ToListAsync();



        public async Task<CompanyHoliday?> getCompanyHolidaysByIdAsync(int id) => await _dbConenct.companyHolidays.FindAsync(id);



        public async Task<CompanyHoliday?> addCompanyHolidayAsync(CompanyHoliday companyHoliday)
        {
            await _dbConenct.companyHolidays.AddAsync(companyHoliday);
            await _dbConenct.SaveChangesAsync();
            return companyHoliday;
        }



        public async Task<CompanyHoliday?> updateCompanyHolidayAsync(int id,  CompanyHoliday companyHoliday)
        {
            var holiday = await getCompanyHolidaysByIdAsync(id);

            if (holiday == null) return null;

            holiday.Day = companyHoliday.Day;
            holiday.Date = companyHoliday.Date;
            holiday.Name = companyHoliday.Name;
            holiday.HolidayType = companyHoliday.HolidayType;

            await _dbConenct.SaveChangesAsync();
            return holiday;
        }



        public async Task<CompanyHoliday?> deleteCompanyHolidayAsync(int id)
        {
            var holiday = await getCompanyHolidaysByIdAsync(id);

            if (holiday == null) return null;

            _dbConenct.companyHolidays.Remove(holiday);
            await _dbConenct.SaveChangesAsync();
            return holiday;
        }

    }
}
