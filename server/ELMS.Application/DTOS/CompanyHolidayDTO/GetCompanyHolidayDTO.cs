using ELMS.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Application.DTOS.CompanyHolidayDTO
{
    public class GetCompanyHolidayDTO
    {
        public string? CompanyHolidayId { get; set; }
        public DateTime Date { get; set; }

        public string? Day { get; set; }

        public string? Name { get; set; }

        public HolidayType HolidayType { get; set; }
    }
}
