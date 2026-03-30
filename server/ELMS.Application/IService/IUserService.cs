using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.UserDTO;

namespace ELMS.Application.IService
{
    public interface IUserService
    {
        Task<APIResponseDTO<int>> GetEmployeeCountAsync();
        Task<IEnumerable<GetUserDTO?>> GetAllUserAsync();
        Task<List<GetUserDTO>?> GetByIdAsync(Guid id);
        Task<GetUserDTO?> UpdateAppUserAsycn(UpdateUserDTO updateUserDTO);
        Task<GetUserDTO?> DeleteUserAsync(Guid id);
    }
}
