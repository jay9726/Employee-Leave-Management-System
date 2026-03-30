using ELMS.Domain.Entities.Identity;
using ELMS.Domain.Enum;

namespace ELMS.Domain.Entities
{
    public class LeaveRequest
    {
        public Guid LeaveRequestId { get; set; }
        public Guid? ApplicationId { get; set; }
        public Employee? Employee { get; set; }

        public Guid? DepartmentId { get; set; }
        public Department? Departments { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Reason { get; set; }


        public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
        public DateTime SubmittedAt { get; set; } = DateTime.Now;

        public Guid? ReviewedById { get; set; }

        public string? AdminComment { get; set; }
        public string? LeaveType { get; set; }
    }
}
