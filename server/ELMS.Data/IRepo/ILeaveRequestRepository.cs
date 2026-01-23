using ELMS.Data.Entity;
using ELMS.Data.Enums;

namespace ELMS.Data.IRepo
{
    public interface ILeaveRequestRepository 
    {
        Task<int> GetPendingLeaveRequestCountAsync();
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestAsync();


        Task<LeaveRequest?> GetLeaveRequestByLeaveRequestIdAsync(int leaverequestId);
        Task<IEnumerable<LeaveRequest?>> GetLeaveRequestByApplicationIdAsync(int appicationId);


        Task<LeaveRequest> ApplyLeaveRequestAsync(LeaveRequest leaveRequest);
        Task<LeaveRequest?> UpdateLeaveRequestAsync(LeaveRequest leaveRequest);


        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByDepartmentIdAsync(int departmentId);
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByStatusAsync(LeaveStatus leaveStatus);
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByDateRangeAsync(DateTime fromDate, DateTime toDate);


        Task<LeaveRequest?> CanceledLeaveRequestAsync(int leaverequestid);

    }
}
