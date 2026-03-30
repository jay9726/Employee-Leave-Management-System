//using ELMS.Application.DTOS.AuthDTO.RequestDTO;
//using ELMS.Application.IService;
//using Microsoft.AspNetCore.Mvc;

//namespace ELMS.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IAuthService _authService;

//        public AuthController(IAuthService authService)
//        {
//            _authService = authService;
//        }



//        [HttpPost("Register")]
//        public async Task<IActionResult> Register(RegisterRequestDTO registerdto)
//        {
//            var response = await _authService.RegisterAsync(registerdto);
//            return Ok(response);
//        }



//        [HttpPost("Login")]
//        public async Task<IActionResult> Login(LoginRequestDTO logindto)
//        {
//            var response = await _authService.LoginAsync(logindto);
//            return Ok(response);
//        }

//    }
//}










using ELMS.Application.DTOS.AuthDTO.RequestDTO;
using ELMS.Application.DTOS.ChangePasswordDTO;
using ELMS.Application.DTOS.ForgetPasswordDTO;
using ELMS.Application.DTOS.ResetPasswordDTO;
using ELMS.Authentication.JWT.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ELMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterRequestDTO registerDto)
        {
            var response = await _authService.RegisterAsync(registerDto);

            if (!response.Success)
                return BadRequest(response.Message);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginDto)
        {
            var response = await _authService.LoginAsync(loginDto);

            if (!response.Success)
                return Unauthorized("Invalid email or password.");

            return Ok(response.Data);
        }



        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO dto)
        {
            await _authService.SendResetLinkAsync(dto.Email!);
            return Ok(new { message = "If the email exists, a reset link has been sent." });
        }

        // POST: api/ForgetPassword/reset-password
        //[Authorize]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO dto)
        {
            await _authService.ResetPasswordAsync(dto);

            return Ok(new { message = "Password reset successful." });
        }

        // POST: api/ForgetPassword/change-password
        //[Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            var result = await _authService.ChangePasswordAsync(changePasswordDTO);
            return StatusCode(result.StatusCode, result);
        }
    }
}
