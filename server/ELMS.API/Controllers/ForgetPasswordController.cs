using ELMS.Application.DTOS.ChangePasswordDTO;
using ELMS.Application.DTOS.ForgetPasswordDTO;
using ELMS.Application.DTOS.ResetPasswordDTO;
using ELMS.Application.IService;
using Microsoft.AspNetCore.Mvc;

namespace ELMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ForgetPasswordController : ControllerBase
    {
        private readonly IForgetPasswordService _forgetPasswordService;

        public ForgetPasswordController(IForgetPasswordService forgetPasswordService)
        {
            _forgetPasswordService = forgetPasswordService;
        }

        
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO dto)
        {
            await _forgetPasswordService.SendResetLinkAsync(dto.Email);
            return Ok(new { message = "If the email exists, a reset link has been sent." });
        }

        
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO dto)
        {
            await _forgetPasswordService.ResetPasswordAsync(
                dto.Email,
                dto.Token,
                dto.NewPassword
            );

            return Ok(new { message = "Password reset successful." });
        }

        
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            var result = await _forgetPasswordService.ChangePasswordAsync(changePasswordDTO);
            return StatusCode(result.StatusCode, result);
        }
    }
}
