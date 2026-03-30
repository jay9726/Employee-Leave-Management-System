using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.DepartmentDTO;

namespace ELMS.Application.IService
{
    public interface IDepartmentService
    {
        Task<APIResponseDTO<int>> GetDepartmentCountAsync();
        Task<APIResponseDTO<IEnumerable<GetDepartmentDTO>>> GetOnlyDepartmentAsync();
        Task<APIResponseDTO<IEnumerable<GetDepartmentDTO>>> GetAllDepartmentAsync();
        Task<APIResponseDTO<GetDepartmentDTO>> GetDepartmentByIdAsync(Guid id);
        Task<APIResponseDTO<AddDepartmentDTO>> AddDepartmentAsync(AddDepartmentDTO dto);
        Task<APIResponseDTO<AddDepartmentDTO>> UpdateDepartmentAsync(Guid id, AddDepartmentDTO dto);
        Task<APIResponseDTO<GetDepartmentDTO>> DeleteDepartmentAsync(Guid id);
    }
}
