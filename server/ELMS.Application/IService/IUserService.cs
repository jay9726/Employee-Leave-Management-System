using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.UserDTO;
using ELMS.Data.Entity;

namespace ELMS.Application.IService
{
    public interface IUserService
    {
        Task<APIResponseDTO<int>> GetEmployeeCountAsync();
        Task<IEnumerable<GetUserDTO?>> GetAllUserAsync();
        Task<List<GetUserDTO>?> GetByIdAsync(int id);
        Task<GetUserDTO?> UpdateAppUserAsycn(UpdateUserDTO updateUserDTO);
        Task<GetUserDTO?> DeleteUserAsync(int id);
    }
}
