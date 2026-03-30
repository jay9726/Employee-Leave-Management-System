using ELMS.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Domain.Entities.Identity
{
    public class Employee : BaseEntity
    {
        public string? FullName { get; set; }
        public Guid? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public string? ImagePath { get; set; }
        public ICollection<LeaveRequest>? LeaveRequests { get; set; }
    }
}
