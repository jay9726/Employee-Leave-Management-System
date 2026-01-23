using ELMS.Data.Enums;

namespace ELMS.Application.DTOS.CompanyHolidayDTO
{
    public class AddCompanyHolidayDTO
    {
        public DateTime Date { get; set; }

        public string? Day { get; set; }

        public string? Name { get; set; }

        public HolidayType HolidayType { get; set; }
    }
}
