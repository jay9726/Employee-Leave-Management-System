using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.LeaveRequestDTO;

namespace ELMS.Application.IService
{
    public interface ILeaveRequestService
    {
        Task<APIResponseDTO<int>> GetPendingLeaveRequestCountAsync();
        Task<APIResponseDTO<GetLeaveRequestDTO>> ApplyLeaveAsync(ApplyLeaveRequestDTO dto);

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetLeaveByUserIdAsync(int applicationId);

        Task<APIResponseDTO<UpdateLeaveRequestDTO>> UpdateLeaveAsync(UpdateLeaveRequestDTO dto);

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveAsync();

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByStatusAsync(string status);

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByDepartmentIdAsync(int departmentId);

        Task<APIResponseDTO<GetLeaveRequestDTO>> CanceledLeaveAsync(int id);

        Task<APIResponseDTO<IEnumerable<GetLeaveRequestDTO>>> GetAllLeaveByDateRangeAsync(DateTime fromDate, DateTime toDate);
    }

}
