using ELMS.Domain.Enum;

namespace ELMS.Application.DTOS.LeaveRequestDTO
{
    public class GetLeaveRequestDTO
    {
        public string LeaveRequestId { get; set; }
        public string? ApplicationId { get; set; }
        public string? DepartmentId { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Reason { get; set; }
        public string? Status { get; set; }
        public string? AdminComment { get; set; }
        public string? UserName { get; set; }
        public string? DepartmentName { get; set; }
        public string? LeaveType { get; set; }
    }
}
