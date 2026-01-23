using ELMS.Data.Enums;

namespace ELMS.Data.Entity
{
    public class LeaveRequest
    {
        public int LeaveRequestId { get; set; }
        public int? ApplicationId { get; set; }
        public AppUser? AppUser { get; set; }
        
        public int? DepartmentId { get; set; }
        public Department? Departments { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Reason { get; set; }


        public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
        public DateTime SubmittedAt { get; set; } = DateTime.Now;

        public int? ReviewedById { get; set; }

        public string? AdminComment { get; set; }
        public string? LeaveType { get; set; }

    }
}
