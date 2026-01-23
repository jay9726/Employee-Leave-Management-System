namespace ELMS.Data.Entity
{
    public class Department
    {
        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<AppUser>? Employee { get; set; }

        public ICollection<LeaveRequest>? LeaveRequests { get; set; }
    }
}
