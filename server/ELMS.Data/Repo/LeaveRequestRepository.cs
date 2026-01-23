using ELMS.Data.DB_Connection;
using ELMS.Data.Entity;
using ELMS.Data.Enums;
using ELMS.Data.IRepo;
using Microsoft.EntityFrameworkCore;

namespace ELMS.Data.Repo
{
    public class LeaveRequestRepository : ILeaveRequestRepository
    {
        private readonly DBConenct _dBConenct;

        public LeaveRequestRepository(DBConenct dBConenct)
        {
            _dBConenct = dBConenct;
        }



        public async Task<int> GetPendingLeaveRequestCountAsync() => await _dBConenct.LeaveRequests.CountAsync(x => x.Status == LeaveStatus.Pending);



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestAsync()
        {
            return await _dBConenct.LeaveRequests
                .Include(lr => lr.AppUser)
                .Include(lr => lr.Departments)
                .AsNoTracking()
                .ToListAsync();
        }



        public async Task<LeaveRequest?> GetLeaveRequestByLeaveRequestIdAsync(int leaverequestId)
        {
            return await _dBConenct.LeaveRequests
               .Include(x => x.AppUser)
               .Include(x => x.Departments)
               .FirstOrDefaultAsync(x => x.LeaveRequestId == leaverequestId);
        }



        public async Task<IEnumerable<LeaveRequest?>> GetLeaveRequestByApplicationIdAsync(int appicationId)
        {
            return await _dBConenct.LeaveRequests
                .Where(x => x.ApplicationId == appicationId)
                        .Include(x => x.AppUser)
                        .Include(x => x.Departments)
                        .ToListAsync();
        }



        public async Task<LeaveRequest> ApplyLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            await _dBConenct.LeaveRequests.AddAsync(leaveRequest);
            await _dBConenct.SaveChangesAsync();
            return leaveRequest;
        }



        public async Task<LeaveRequest?> UpdateLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            var findLeaveRequest = await _dBConenct.LeaveRequests.FindAsync(leaveRequest.LeaveRequestId);

            if (findLeaveRequest == null) return null;

            findLeaveRequest.Status = leaveRequest.Status;
            findLeaveRequest.AdminComment = leaveRequest.AdminComment;
            findLeaveRequest.ReviewedById = leaveRequest.ReviewedById;

            await _dBConenct.SaveChangesAsync();
            return leaveRequest;
        }



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByDepartmentIdAsync(int departmentId)
        {
            return await _dBConenct.LeaveRequests
                .Where(x => x.DepartmentId == departmentId)
                .Include(x => x.AppUser)
                .Include(x => x.Departments)
                .ToListAsync();
        }



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByStatusAsync(LeaveStatus leaveStatus)
        {
            return await _dBConenct.LeaveRequests
                .Where(x => x.Status == leaveStatus)
                .Include(x => x.AppUser)
                .Include(x => x.Departments)
                .ToListAsync();
        }



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByDateRangeAsync(DateTime fromDate, DateTime toDate)
        {
            toDate = toDate.Date.AddDays(1).AddTicks(-1);

            return await _dBConenct.LeaveRequests
               .Where(x => x.FromDate <= toDate && x.ToDate >= fromDate)
               .Include(x => x.AppUser)
               .Include(x => x.Departments)
               .ToListAsync();
        }



        public async Task<LeaveRequest?> CanceledLeaveRequestAsync(int leaverequestid)
        {
            var findLeaveReqeust = await _dBConenct.LeaveRequests.FirstOrDefaultAsync(x => x.LeaveRequestId == leaverequestid);

            if (findLeaveReqeust == null) return null;

            findLeaveReqeust.Status = LeaveStatus.Canceled;
            await _dBConenct.SaveChangesAsync();
            return findLeaveReqeust; ;

        }

    }
}
