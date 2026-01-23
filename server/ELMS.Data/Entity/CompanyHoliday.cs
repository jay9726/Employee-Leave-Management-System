using ELMS.Data.Enums;

namespace ELMS.Data.Entity
{
    public class CompanyHoliday
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string? Day { get; set; } 

        public string? Name { get; set; } 

        public HolidayType HolidayType { get; set; }
    }
}
