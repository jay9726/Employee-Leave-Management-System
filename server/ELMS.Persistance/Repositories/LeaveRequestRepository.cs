using ELMS.Application.IRepositories;
using ELMS.Domain.Entities;
using ELMS.Domain.Enum;
using ELMS.Persistance.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Persistance.Repositories
{
    public class LeaveRequestRepository : ILeaveRequestRepository
    {
        private readonly ELMSContext _dbContext;

        public LeaveRequestRepository(ELMSContext dBContext)
        {
            _dbContext = dBContext;
        }



        public async Task<int> GetPendingLeaveRequestCountAsync() => await _dbContext.LeaveRequests.CountAsync(x => x.Status == LeaveStatus.Pending);



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestAsync()
        {
            return await _dbContext.LeaveRequests
                .Include(lr => lr.Employee)
                .Include(lr => lr.Departments)
                .AsNoTracking()
                .ToListAsync();
        }



        public async Task<LeaveRequest?> GetLeaveRequestByLeaveRequestIdAsync(Guid leaverequestId)
        {
            return await _dbContext.LeaveRequests
               .Include(x => x.Employee)
               .Include(x => x.Departments)
               .FirstOrDefaultAsync(x => x.LeaveRequestId == leaverequestId);
        }



        public async Task<IEnumerable<LeaveRequest?>> GetLeaveRequestByApplicationIdAsync(Guid appicationId)
        {
            return await _dbContext.LeaveRequests
                .Where(x => x.ApplicationId == appicationId)
                        .Include(x => x.Employee)
                        .Include(x => x.Departments)
                        .ToListAsync();
        }



        public async Task<LeaveRequest> ApplyLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            await _dbContext.LeaveRequests.AddAsync(leaveRequest);
            await _dbContext.SaveChangesAsync();
            return leaveRequest;
        }



        public async Task<LeaveRequest?> UpdateLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            var findLeaveRequest = await _dbContext.LeaveRequests.FindAsync(leaveRequest.LeaveRequestId);

            if (findLeaveRequest == null) return null;

            findLeaveRequest.Status = leaveRequest.Status;
            findLeaveRequest.AdminComment = leaveRequest.AdminComment;
            findLeaveRequest.ReviewedById = leaveRequest.ReviewedById;

            await _dbContext.SaveChangesAsync();
            return leaveRequest;
        }



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByDepartmentIdAsync(Guid departmentId)
        {
            return await _dbContext.LeaveRequests
                .Where(x => x.DepartmentId == departmentId)
                .Include(x => x.Employee)
                .Include(x => x.Departments)
                .ToListAsync();
        }



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByStatusAsync(LeaveStatus leaveStatus)
        {
            return await _dbContext.LeaveRequests
                .Where(x => x.Status == leaveStatus)
                .Include(x => x.Employee)
                .Include(x => x.Departments)
                .ToListAsync();
        }



        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestByDateRangeAsync(DateTime fromDate, DateTime toDate)
        {
            toDate = toDate.Date.AddDays(1).AddTicks(-1);

            return await _dbContext.LeaveRequests
               .Where(x => x.FromDate <= toDate && x.ToDate >= fromDate)
               .Include(x => x.Employee)
               .Include(x => x.Departments)
               .ToListAsync();
        }



        public async Task<LeaveRequest?> CanceledLeaveRequestAsync(Guid leaverequestid)
        {
            var findLeaveReqeust = await _dbContext.LeaveRequests.FirstOrDefaultAsync(x => x.LeaveRequestId == leaverequestid);

            if (findLeaveReqeust == null) return null;

            findLeaveReqeust.Status = LeaveStatus.Canceled;
            await _dbContext.SaveChangesAsync();
            return findLeaveReqeust; ;

        }
    }
}
