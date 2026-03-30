using ELMS.Domain.Entities;
using ELMS.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Application.IRepositories
{
    public interface ILeaveRequestRepository
    {
        Task<int> GetPendingLeaveRequestCountAsync();
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestAsync();


        Task<LeaveRequest?> GetLeaveRequestByLeaveRequestIdAsync(Guid leaverequestId);
        Task<IEnumerable<LeaveRequest?>> GetLeaveRequestByApplicationIdAsync(Guid appicationId);


        Task<LeaveRequest> ApplyLeaveRequestAsync(LeaveRequest leaveRequest);
        Task<LeaveRequest?> UpdateLeaveRequestAsync(LeaveRequest leaveRequest);


        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByDepartmentIdAsync(Guid departmentId);
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByStatusAsync(LeaveStatus leaveStatus);
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByDateRangeAsync(DateTime fromDate, DateTime toDate);


        Task<LeaveRequest?> CanceledLeaveRequestAsync(Guid leaverequestid);
    }
}
