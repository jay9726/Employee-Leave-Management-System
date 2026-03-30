using ELMS.Application.IRepositories;
using ELMS.Domain.Entities;
using ELMS.Persistance.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Persistance.Repositories
{
    internal class CompanyHolidayRepository : ICompanyHolidayRepository
    {
        private readonly ELMSContext _dbContext;

        public CompanyHolidayRepository(ELMSContext dBContext)
        {
            _dbContext = dBContext;
        }



        public async Task<IEnumerable<CompanyHoliday>> getAllCompanyHolidaysAsync() => await _dbContext.CompanyHolidays.ToListAsync();



        public async Task<CompanyHoliday?> getCompanyHolidaysByIdAsync(Guid id) => await _dbContext.CompanyHolidays.FindAsync(id);



        public async Task<CompanyHoliday?> addCompanyHolidayAsync(CompanyHoliday companyHoliday)
        {
            await _dbContext.CompanyHolidays.AddAsync(companyHoliday);
            await _dbContext.SaveChangesAsync();
            return companyHoliday;
        }



        public async Task<CompanyHoliday?> updateCompanyHolidayAsync(Guid id, CompanyHoliday companyHoliday)
        {
            var holiday = await getCompanyHolidaysByIdAsync(id);

            if (holiday == null) return null;

            holiday.Day = companyHoliday.Day;
            holiday.Date = companyHoliday.Date;
            holiday.Name = companyHoliday.Name;
            holiday.HolidayType = companyHoliday.HolidayType;

            await _dbContext.SaveChangesAsync();
            return holiday;
        }



        public async Task<CompanyHoliday?> deleteCompanyHolidayAsync(Guid id)
        {
            var holiday = await getCompanyHolidaysByIdAsync(id);

            if (holiday == null) return null;

            _dbContext.CompanyHolidays.Remove(holiday);
            await _dbContext.SaveChangesAsync();
            return holiday;
        }
    }
}
