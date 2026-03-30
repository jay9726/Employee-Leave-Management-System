//using ELMS.Application.DTOS.UserDTO;
//using ELMS.Application.IService;
//using Microsoft.AspNetCore.Mvc;

//namespace ELMS.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//        private readonly IUserService _userService;

//        public UserController(IUserService userService)
//        {
//            _userService = userService;
//        }




//        [HttpGet]
//        public async Task<IActionResult> GetAllUsers()
//        {
//            var users = await _userService.GetAllUserAsync();
//            return Ok(users);
//        }



//        [HttpGet("userCount")]
//        public async Task<ActionResult> GetUserCount()
//        {
//            var result = await _userService.GetEmployeeCountAsync();
//            return Ok(result);
//        }



//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetUserById(int id)
//        {
//            var user = await _userService.GetByIdAsync(id);
//            if (user == null)
//            {
//                return NotFound();
//            }
//            return Ok(user);
//        }



//        [HttpPost]
//        public async Task<IActionResult> UpdateUser(UpdateUserDTO updateUserDTO)
//        {
//            if (updateUserDTO.ApplicationId == 0)
//            {
//                return BadRequest("User ID mismatch");
//            }
//            var updatedUser = await _userService.UpdateAppUserAsycn(updateUserDTO);
//            if (updatedUser == null)
//            {
//                return NotFound();
//            }
//            return Ok(updatedUser);
//        }



//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteUser(int id)
//        {
//            var deletedUser = await _userService.DeleteUserAsync(id);
//            if (deletedUser == null)
//            {
//                return Ok(new { code = 400, message = "User Leave Request is Pending... So you can't delete user" });
//            }
//            return Ok(deletedUser);
//        }
//    }
//}











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

        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUserAsync();
            return Ok(users);
        }

        // GET: api/User/userCount
        [HttpGet("userCount")]
        public async Task<IActionResult> GetUserCount()
        {
            var result = await _userService.GetEmployeeCountAsync();
            return Ok(result);
        }

        // GET: api/User/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        // POST: api/User (Update User)
        [HttpPost]
        public async Task<IActionResult> UpdateUser([FromForm] UpdateUserDTO updateUserDTO)
        {
            if (updateUserDTO.ApplicationId == Guid.Empty)
                return BadRequest(new { message = "Invalid user ID" });

            var updatedUser = await _userService.UpdateAppUserAsycn(updateUserDTO);

            if (updatedUser == null)
                return NotFound(new { message = "User not found or update failed" });

            return Ok(updatedUser);
        }

        // DELETE: api/User/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
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
