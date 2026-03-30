using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.LeaveRequestDTO;
using ELMS.Domain.Enum;

namespace ELMS.Application.IService
{
    public interface ILeaveRequestService
    {
        Task<APIResponseDTO<int>> GetPendingLeaveRequestCountAsync();
        Task<APIResponseDTO<GetLeaveRequestDTO>> ApplyLeaveAsync(ApplyLeaveRequestDTO dto);

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetLeaveByUserIdAsync(Guid employeeId);

        Task<APIResponseDTO<UpdateLeaveRequestDTO>> UpdateLeaveAsync(UpdateLeaveRequestDTO dto);

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveAsync();

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByStatusAsync(LeaveStatus status);

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByDepartmentIdAsync(Guid departmentId);

        Task<APIResponseDTO<GetLeaveRequestDTO>> CanceledLeaveAsync(Guid id);

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByDateRangeAsync(DateTime fromDate, DateTime toDate);
    }

}
