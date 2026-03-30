//using ELMS.Application.DTOS.APIResponse;
//using ELMS.Application.DTOS.LeaveRequestDTO;
//using ELMS.Application.IService;
//using ELMS.Data.Entity;
//using ELMS.Data.Enums;
//using ELMS.Data.IRepo;
//using ELMS.Data.Repo;

//namespace ELMS.Application.Service
//{
//    public class LeaveRequestService : ILeaveRequestService
//    {
//        private readonly ILeaveRequestRepository _leaveRequestRepository;
//        private readonly IUserRepository _userRepository;
//        private readonly IDepartmentRepository _departmentRepository;

//        public LeaveRequestService(ILeaveRequestRepository leaveRequestRepository, IUserRepository userRepository, IDepartmentRepository departmentRepository)
//        {
//            _leaveRequestRepository = leaveRequestRepository;
//            _userRepository = userRepository;
//            _departmentRepository = departmentRepository;
//        }



//        public async Task<APIResponseDTO<int>> GetPendingLeaveRequestCountAsync()
//        {
//            var result = await _leaveRequestRepository.GetPendingLeaveRequestCountAsync();
//            return new APIResponseDTO<int> (200, "Pending Leave Request Count Fetched Successfully" ,result);
//        }



//        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveAsync()
//        {
//            var list = await _leaveRequestRepository.GetAllLeaveRequestAsync();

//            var data = list.Select(x => new GetLeaveRequestDTO
//            {

//                LeaveRequestId = x.LeaveRequestId,
//                ApplicationId = x.ApplicationId,
//                DepartmentId = x.DepartmentId,
//                UserName = x.AppUser.FullName,
//                DepartmentName = x.Departments.DepartmentName,
//                FromDate = x.FromDate,
//                ToDate = x.ToDate,
//                Reason = x.Reason,
//                Status = x.Status.ToString(),
//                AdminComment = x.AdminComment,
//                LeaveType = x.LeaveType,
//            }).ToList();

//            return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
//                200, "Leave requests fetched successfully", data);
//        }



//        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetLeaveByUserIdAsync(int applicationId)
//        {
//            var leave = await _leaveRequestRepository
//                .GetLeaveRequestByApplicationIdAsync(applicationId);

//            if (leave == null)
//            {
//                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
//                    404, "Leave request not found", null);
//            }


//            var data = leave.Select(x => new GetLeaveRequestDTO
//            {

//                LeaveRequestId = x.LeaveRequestId,
//                ApplicationId = x.ApplicationId,
//                DepartmentId = x.DepartmentId,
//                UserName = x.AppUser.FullName,
//                DepartmentName = x.Departments.DepartmentName,
//                FromDate = x.FromDate,
//                ToDate = x.ToDate,
//                Reason = x.Reason,
//                Status = x.Status.ToString(),
//                AdminComment = x.AdminComment,
//                LeaveType = x.LeaveType,
//            });

//            return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
//                200, "Leave request fetched successfully", data);
//        }



//        public async Task<APIResponseDTO<GetLeaveRequestDTO>> ApplyLeaveAsync(ApplyLeaveRequestDTO dto)
//        {
//            var leave = new LeaveRequest
//            {
//                ApplicationId = dto.ApplicantId,
//                DepartmentId = dto.DepartmentId,
//                FromDate = dto.FromDate,
//                ToDate = dto.ToDate,
//                Reason = dto.Reason,
//                Status = LeaveStatus.Pending,
//                LeaveType = dto.LeaveType
//            };

//            var created = await _leaveRequestRepository.ApplyLeaveRequestAsync(leave);

//            var user = created.ApplicationId.HasValue
//                ? await _userRepository.GetUserByIdAsync(created.ApplicationId.Value)
//                : null;

//            var department = created.DepartmentId.HasValue
//                ? await _departmentRepository.GetDepartmenByIdAsync(created.DepartmentId.Value)
//                : null;

//                var response = new GetLeaveRequestDTO
//            {
//                LeaveRequestId = created.LeaveRequestId,
//                ApplicationId = user.Id,
//                DepartmentId = department.DepartmentId,
//                UserName = created.AppUser!.FullName,
//                DepartmentName = created.Departments!.DepartmentName,
//                FromDate = created.FromDate,
//                ToDate = created.ToDate,
//                Reason = created.Reason,
//                Status = created.Status.ToString(),
//                AdminComment = created.AdminComment
//            };

//            return new APIResponseDTO<GetLeaveRequestDTO>(
//                201, "Leave applied successfully", response);
//        }



//        public async Task<APIResponseDTO<UpdateLeaveRequestDTO>> UpdateLeaveAsync(UpdateLeaveRequestDTO dto)
//        {
//            var leave = await _leaveRequestRepository
//                .GetLeaveRequestByLeaveRequestIdAsync(dto.LeaveRequestId);

//            if (leave == null)
//            {
//                return new APIResponseDTO<UpdateLeaveRequestDTO>(
//                    404, "Leave request not found", null);
//            }

//            leave.Status = dto.Approve
//                ? LeaveStatus.Approved
//                : LeaveStatus.Rejected;

//            leave.AdminComment = dto.AdminComment;
//            leave.ReviewedById = dto.ReviewedById;

//            var updated = await _leaveRequestRepository.UpdateLeaveRequestAsync(leave);

//            var data = new UpdateLeaveRequestDTO
//            {
//                ReviewedById = updated.ApplicationId,
//                AdminComment = updated.AdminComment,
//                LeaveRequestId = updated.LeaveRequestId,
//                Approve = true
//            };

//            return new APIResponseDTO<UpdateLeaveRequestDTO>(
//                200, "Leave updated successfully", data);
//        }



//        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByStatusAsync(string status)
//        {
//            var s = (LeaveStatus)Enum.Parse(typeof(LeaveStatus), status, true);
//            var list = await _leaveRequestRepository.GetAllLeaveRequestByStatusAsync(s);

//            return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
//                200, "Leave requests fetched by status", list.Select(Map));
//        }



//        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByDepartmentIdAsync(int departmentId)
//        {
//            var list = await _leaveRequestRepository
//                .GetAllLeaveRequestByDepartmentIdAsync(departmentId);

//            return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
//                200, "Leave requests fetched by department", list.Select(Map));
//        }



//        public async Task<APIResponseDTO<GetLeaveRequestDTO>> CanceledLeaveAsync(int id)
//        {
//            var canceled = await _leaveRequestRepository.CanceledLeaveRequestAsync(id);

//            if (canceled == null)
//            {
//                return new APIResponseDTO<GetLeaveRequestDTO>(
//                    404, "Leave request not found", null);
//            }

//            return new APIResponseDTO<GetLeaveRequestDTO>(
//                200, "Leave request canceled successfully", Map(canceled));
//        }



//        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByDateRangeAsync(
//            DateTime fromDate, DateTime toDate)
//        {
//            var list = await _leaveRequestRepository
//                .GetAllLeaveRequestByDateRangeAsync(fromDate, toDate);

//            return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
//                200, "Leave requests fetched by date range", list.Select(Map));
//        }



//        private GetLeaveRequestDTO Map(LeaveRequest l)
//        {
//            return new GetLeaveRequestDTO
//            {
//                LeaveRequestId = l.LeaveRequestId,
//                ApplicationId = l.ApplicationId,
//                DepartmentId = l.DepartmentId,
//                UserName = l.AppUser?.FullName ?? "",
//                DepartmentName = l.Departments?.DepartmentName ?? "",
//                FromDate = l.FromDate,
//                ToDate = l.ToDate,
//                Reason = l.Reason,
//                Status = l.Status.ToString(),
//                AdminComment = l.AdminComment,
//                LeaveType = l.LeaveType,
//            };
//        }

//    }

//}



















using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.LeaveRequestDTO;
using ELMS.Application.ICommon;
using ELMS.Application.IService;
using ELMS.Domain.Entities;
using ELMS.Domain.Enum;

namespace ELMS.Application.Service
{
    public class LeaveRequestService : ILeaveRequestService
    {
        private readonly IUnitOfWork _unitOfWork;

        public LeaveRequestService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<APIResponseDTO<int>> GetPendingLeaveRequestCountAsync()
        {
            try
            {
                var result = await _unitOfWork.LeaveRequestRepository.GetPendingLeaveRequestCountAsync();
                return new APIResponseDTO<int>(
                    200,
                    "Pending Leave Request Count Fetched Successfully",
                    result
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<int>(
                    500,
                    "An error occurred while fetching pending leave request count",
                    0
                );
            }
        }

        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveAsync()
        {
            try
            {
                var list = await _unitOfWork.LeaveRequestRepository.GetAllLeaveRequestAsync();

                var data = list.Select(x => new GetLeaveRequestDTO
                {
                    LeaveRequestId = x.LeaveRequestId.ToString(),
                    ApplicationId = x.ApplicationId.ToString(),
                    DepartmentId = x.DepartmentId.ToString(),
                    UserName = x.Employee.FullName,
                    DepartmentName = x.Departments.DepartmentName,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate,
                    Reason = x.Reason,
                    Status = x.Status.ToString(),
                    AdminComment = x.AdminComment,
                    LeaveType = x.LeaveType,
                }).ToList();

                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    200,
                    "Leave requests fetched successfully",
                    data
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    500,
                    "An error occurred while fetching leave requests",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetLeaveByUserIdAsync(Guid employeeId)
        {
            try
            {
                var leave = await _unitOfWork.LeaveRequestRepository
                    .GetLeaveRequestByApplicationIdAsync(employeeId);

                if (leave == null)
                {
                    return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                        404,
                        "Leave request not found",
                        null
                    );
                }

                var data = leave.Select(x => new GetLeaveRequestDTO
                {
                    LeaveRequestId = x.LeaveRequestId.ToString(),
                    ApplicationId = x.ApplicationId.ToString(),
                    DepartmentId = x.DepartmentId.ToString(),
                    UserName = x.Employee.FullName,
                    DepartmentName = x.Departments.DepartmentName,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate,
                    Reason = x.Reason,
                    Status = x.Status.ToString(),
                    AdminComment = x.AdminComment,
                    LeaveType = x.LeaveType,
                });

                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    200,
                    "Leave request fetched successfully",
                    data
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    500,
                    "An error occurred while fetching leave requests",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<GetLeaveRequestDTO>> ApplyLeaveAsync(ApplyLeaveRequestDTO dto)
        {
            try
            {
                var leave = new LeaveRequest
                {
                    ApplicationId = dto.EmployeeId,
                    DepartmentId = dto.DepartmentId,
                    FromDate = dto.FromDate,
                    ToDate = dto.ToDate,
                    Reason = dto.Reason,
                    Status = LeaveStatus.Pending,
                    LeaveType = dto.LeaveType
                };

                var created = await _unitOfWork.LeaveRequestRepository.ApplyLeaveRequestAsync(leave);

                var user = created.ApplicationId.HasValue
                    ? await _unitOfWork.UserRepository.GetUserByIdAsync(created.ApplicationId.Value)
                    : null;

                var department = created.DepartmentId.HasValue
                    ? await _unitOfWork.DepartmentRepository.GetDepartmenByIdAsync(created.DepartmentId.Value)
                    : null;

                var response = new GetLeaveRequestDTO
                {
                    LeaveRequestId = created.LeaveRequestId.ToString(),
                    ApplicationId = user.Id.ToString(),
                    DepartmentId = department.DepartmentId.ToString(),
                    UserName = created.Employee!.FullName,
                    DepartmentName = created.Departments!.DepartmentName,
                    FromDate = created.FromDate,
                    ToDate = created.ToDate,
                    Reason = created.Reason,
                    Status = created.Status.ToString(),
                    AdminComment = created.AdminComment
                };

                return new APIResponseDTO<GetLeaveRequestDTO>(
                    201,
                    "Leave applied successfully",
                    response
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<GetLeaveRequestDTO>(
                    500,
                    "An error occurred while applying leave",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<UpdateLeaveRequestDTO>> UpdateLeaveAsync(UpdateLeaveRequestDTO dto)
        {
            try
            {
                var leave = await _unitOfWork.LeaveRequestRepository
                    .GetLeaveRequestByLeaveRequestIdAsync(dto.LeaveRequestId);

                if (leave == null)
                {
                    return new APIResponseDTO<UpdateLeaveRequestDTO>(
                        404,
                        "Leave request not found",
                        null
                    );
                }

                leave.Status = dto.Approve
                    ? LeaveStatus.Approved
                    : LeaveStatus.Rejected;

                leave.AdminComment = dto.AdminComment;
                leave.ReviewedById = dto.ReviewedById;

                var updated = await _unitOfWork.LeaveRequestRepository.UpdateLeaveRequestAsync(leave);

                var data = new UpdateLeaveRequestDTO
                {
                    ReviewedById = updated.ApplicationId,
                    AdminComment = updated.AdminComment,
                    LeaveRequestId = updated.LeaveRequestId,
                    Approve = true
                };

                return new APIResponseDTO<UpdateLeaveRequestDTO>(
                    200,
                    "Leave updated successfully",
                    data
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<UpdateLeaveRequestDTO>(
                    500,
                    "An error occurred while updating the leave request",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByStatusAsync(LeaveStatus status)
        {
            try
            {
                //var s = (LeaveStatus)Enum.Parse(typeof(LeaveStatus), status, true);
                var list = await _unitOfWork.LeaveRequestRepository.GetAllLeaveRequestByStatusAsync(status);

                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    200,
                    "Leave requests fetched by status",
                    list.Select(Map)
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    500,
                    "An error occurred while fetching leave requests by status",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByDepartmentIdAsync(Guid departmentId)
        {
            try
            {
                var list = await _unitOfWork.LeaveRequestRepository
                    .GetAllLeaveRequestByDepartmentIdAsync(departmentId);

                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    200,
                    "Leave requests fetched by department",
                    list.Select(Map)
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    500,
                    "An error occurred while fetching leave requests by department",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<GetLeaveRequestDTO>> CanceledLeaveAsync(Guid id)
        {
            try
            {
                var canceled = await _unitOfWork.LeaveRequestRepository.CanceledLeaveRequestAsync(id);

                if (canceled == null)
                {
                    return new APIResponseDTO<GetLeaveRequestDTO>(
                        404,
                        "Leave request not found",
                        null
                    );
                }

                return new APIResponseDTO<GetLeaveRequestDTO>(
                    200,
                    "Leave request canceled successfully",
                    Map(canceled)
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<GetLeaveRequestDTO>(
                    500,
                    "An error occurred while canceling the leave request",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByDateRangeAsync(
            DateTime fromDate, DateTime toDate)
        {
            try
            {
                var list = await _unitOfWork.LeaveRequestRepository
                    .GetAllLeaveRequestByDateRangeAsync(fromDate, toDate);

                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    200,
                    "Leave requests fetched by date range",
                    list.Select(Map)
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>(
                    500,
                    "An error occurred while fetching leave requests by date range",
                    null
                );
            }
        }

        private GetLeaveRequestDTO Map(LeaveRequest l)
        {
            return new GetLeaveRequestDTO
            {
                LeaveRequestId = l.LeaveRequestId.ToString(),
                ApplicationId = l.ApplicationId.ToString(),
                DepartmentId = l.DepartmentId.ToString(),
                UserName = l.Employee?.FullName ?? "",
                DepartmentName = l.Departments?.DepartmentName ?? "",
                FromDate = l.FromDate,
                ToDate = l.ToDate,
                Reason = l.Reason,
                Status = l.Status.ToString(),
                AdminComment = l.AdminComment,
                LeaveType = l.LeaveType,
            };
        }
    }
}
