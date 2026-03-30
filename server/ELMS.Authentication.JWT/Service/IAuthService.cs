using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.AuthDTO.RequestDTO;
using ELMS.Application.DTOS.AuthDTO.ResponseDTO;
using ELMS.Application.DTOS.ChangePasswordDTO;
using ELMS.Application.DTOS.ResetPasswordDTO;

namespace ELMS.Authentication.JWT.Service
{
    public interface IAuthService
    {
        Task<(bool Success, AuthResponseDTO? Data, string Message)> LoginAsync(LoginRequestDTO request);

        Task<(bool Success, AuthResponseDTO? data, string Message)> RegisterAsync(RegisterRequestDTO responseDTO);

        //Task ForgotPasswordAsync(ForgotPasswordDTO request, string resetBaseUrl);
        Task SendResetLinkAsync(string email);
        Task ResetPasswordAsync(ResetPasswordDTO dto);
        Task<APIResponseDTO<string>> ChangePasswordAsync(ChangePasswordDTO dto);
    }
}
