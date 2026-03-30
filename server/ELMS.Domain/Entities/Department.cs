using ELMS.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Domain.Entities
{
    public class Department
    {
        public Guid DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<Employee>? Employee { get; set; }

        public ICollection<LeaveRequest>? LeaveRequests { get; set; }
    }
}
