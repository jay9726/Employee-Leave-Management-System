namespace ELMS.Application.DTOS.LeaveRequestDTO
{
    public class ApplyLeaveRequestDTO
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Reason { get; set; }
        public int? DepartmentId { get; set; }
        public int? ApplicantId { get; set; }
        public string? LeaveType { get; set; }
    }
}
