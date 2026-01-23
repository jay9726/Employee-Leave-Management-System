using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.DepartmentDTO;

namespace ELMS.Application.IService
{
    public interface IDepartmentService
    {
        Task<APIResponseDTO<int>> GetDepartmentCountAsync();
        Task<APIResponseDTO<IEnumerable<GetDepartmentDTO>>> GetOnlyDepartmentAsync();
        Task<APIResponseDTO<IEnumerable<GetDepartmentDTO>>> GetAllDepartmentAsync(int page);
        Task<APIResponseDTO<GetDepartmentDTO>> GetDepartmentByIdAsync(int id);
        Task<APIResponseDTO<AddDepartmentDTO>> AddDepartmentAsync(AddDepartmentDTO dto);
        Task<APIResponseDTO<AddDepartmentDTO>> UpdateDepartmentAsync(int id, AddDepartmentDTO dto);
        Task<APIResponseDTO<GetDepartmentDTO>> DeleteDepartmentAsync(int id);
    }
}
