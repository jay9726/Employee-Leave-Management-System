using Microsoft.AspNetCore.Identity;

namespace ELMS.Data.Entity
{
    public class AppUser : IdentityUser<int>
    {
        public string? FullName { get; set; }
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public string? ImagePath { get; set; }
        public ICollection<LeaveRequest>? LeaveRequests { get; set; }
    }
}
