namespace ELMS.Application.DTOS.LeaveRequestDTO
{
    public class GetLeaveRequestDTO
    {
        public int LeaveRequestId { get; set; }
        public int? ApplicationId { get; set; }
        public int? DepartmentId { get; set; }

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
