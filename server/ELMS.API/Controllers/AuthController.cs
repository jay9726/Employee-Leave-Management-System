using ELMS.Application.DTOS.AuthDTO.RequestDTO;
using ELMS.Application.IService;
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

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterRequestDTO registerDto)
        {
            var response = await _authService.RegisterAsync(registerDto);

            if (response == null)
                return BadRequest("Registration failed.");

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginDto)
        {
            var response = await _authService.LoginAsync(loginDto);

            if (response == null)
                return Unauthorized("Invalid email or password.");

            return Ok(response);
        }
    }
}
