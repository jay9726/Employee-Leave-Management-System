using ELMS.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Application.DTOS.CompanyHolidayDTO
{
    public class GetCompanyHolidayDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public string? Day { get; set; }

        public string? Name { get; set; }

        public string? HolidayType { get; set; }
    }
}
