using ELMS.Domain.Enum;

namespace ELMS.Application.DTOS.LeaveRequestDTO
{
    public class ApplyLeaveRequestDTO
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Reason { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? EmployeeId { get; set; }
        public string? LeaveType { get; set; }
    }
}
