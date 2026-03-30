using ELMS.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Domain.Entities
{
    public class CompanyHoliday
    {
        public Guid CompanyHolidayId { get; set; }

        public DateTime Date { get; set; }

        public string? Day { get; set; }

        public string? Name { get; set; }

        public HolidayType HolidayType { get; set; }
    }
}
