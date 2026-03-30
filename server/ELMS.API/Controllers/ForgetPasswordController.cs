////using ELMS.Application.DTOS.ChangePasswordDTO;
////using ELMS.Application.DTOS.ForgetPasswordDTO;
////using ELMS.Application.DTOS.ResetPasswordDTO;
////using ELMS.Application.IService;
////using Microsoft.AspNetCore.Mvc;

////namespace ELMS.API.Controllers
////{
////    [Route("api/[controller]")]
////    [ApiController]
////    public class ForgetPasswordController : ControllerBase
////    {
////        private readonly IForgetPasswordService _forgetPasswordService;

////        public ForgetPasswordController(IForgetPasswordService forgetPasswordService)
////        {
////            _forgetPasswordService = forgetPasswordService;
////        }



////        [HttpPost("forgot-password")]
////        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO dto)
////        {
////            await _forgetPasswordService.SendResetLinkAsync(dto.Email);

////            return Ok("If email exists, reset link sent.");
////        }



////        [HttpPost("reset-password")]
////        public async Task<IActionResult> ResetPassword(ResetPasswordDTO dto)
////        {
////            await _forgetPasswordService.ResetPasswordAsync(
////                dto.Email,
////                dto.Token,
////                dto.NewPassword
////            );

////            return Ok("Password reset successful");
////        }


////        [HttpPost("change-password")]
////        public async Task<IActionResult> ChangePassword(ChangePasswordDTO changePasswordDTO)
////        {
////            var result = await _forgetPasswordService.ChangePasswordAsync(changePasswordDTO);
////            return Ok(result);
////        }

////    }
////}










//using ELMS.Application.DTOS.ChangePasswordDTO;
//using ELMS.Application.DTOS.ForgetPasswordDTO;
//using ELMS.Application.DTOS.ResetPasswordDTO;
//using ELMS.Application.IService;
//using Microsoft.AspNetCore.Mvc;

//namespace ELMS.API.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class ForgetPasswordController : ControllerBase
//    {
//        private readonly IForgetPasswordService _forgetPasswordService;

//        public ForgetPasswordController(IForgetPasswordService forgetPasswordService)
//        {
//            _forgetPasswordService = forgetPasswordService;
//        }

//        // POST: api/ForgetPassword/forgot-password
       
//    }
//}
