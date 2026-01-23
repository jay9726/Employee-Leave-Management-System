using ELMS.Application.DTOS.UserDTO;
using ELMS.Application.IService;
using Microsoft.AspNetCore.Mvc;

namespace ELMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUserAsync();
            return Ok(users);
        }

        
        [HttpGet("userCount")]
        public async Task<IActionResult> GetUserCount()
        {
            var result = await _userService.GetEmployeeCountAsync();
            return Ok(result);
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        
        [HttpPost]
        public async Task<IActionResult> UpdateUser([FromForm] UpdateUserDTO updateUserDTO)
        {
            if (updateUserDTO.ApplicationId == 0)
                return BadRequest(new { message = "Invalid user ID" });

            var updatedUser = await _userService.UpdateAppUserAsycn(updateUserDTO);

            if (updatedUser == null)
                return NotFound(new { message = "User not found or update failed" });

            return Ok(updatedUser);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deletedUser = await _userService.DeleteUserAsync(id);

            if (deletedUser == null)
            {
                return BadRequest(new
                {
                    code = 400,
                    message = "User has a pending leave request and cannot be deleted"
                });
            }

            return Ok(deletedUser);
        }
    }
}
