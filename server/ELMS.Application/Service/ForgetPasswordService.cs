////using ELMS.Application.IService;
////using ELMS.Data.Entity;
////using Microsoft.AspNetCore.Identity;
////using ELMS.Application.DTOS.ChangePasswordDTO;
////using ELMS.Data.IRepo;
////using ELMS.Application.DTOS.APIResponse;

////namespace ELMS.Application.Service
////{
////    public class ForgetPasswordService : IForgetPasswordService
////    {
////        private readonly UserManager<AppUser> _userManager;
////        private readonly IEmailService _emailService;
////        private readonly IUserRepository _userRepository;

////        public ForgetPasswordService(UserManager<AppUser> userManager, IEmailService emailService, IUserRepository userRepository)
////        {
////            _userManager = userManager;
////            _emailService = emailService;
////            _userRepository = userRepository;
////        }



////        public async Task SendResetLinkAsync(string email)
////        {
////            var user = await _userManager.FindByEmailAsync(email);
////            if (user == null) return;

////            var token = await _userManager.GeneratePasswordResetTokenAsync(user);


////            var frontendUrl = "http://localhost:5173/resetpassword";

////            var encodedToken = Uri.EscapeDataString(token);
////            var encodedEmail = Uri.EscapeDataString(email);

////            var resetLink = $"{frontendUrl}?email={encodedEmail}&token={encodedToken}";

////            var emailBody = $@"
////            <p>You requested to reset your password.</p>
////            <p>
////                <a href='{resetLink}'>Reset Password</a>
////            </p>
////            <p>This link will expire automatically.</p>
////        ";

////            await _emailService.SendEmailAsync(
////                email,
////                "Reset Your Password",
////                emailBody
////            );
////        }



////        public async Task ResetPasswordAsync(string email, string token, string newPassword)
////        {
////            var user = await _userManager.FindByEmailAsync(email);
////            if (user == null)
////                throw new Exception("Invalid request");

////            var result = await _userManager.ChangePasswordAsync(
////                user,
////                token,
////                newPassword
////            );

////            if (!result.Succeeded)
////                throw new Exception(result.Errors.First().Description);
////        }



////        public async Task<APIResponseDTO<string>> ChangePasswordAsync(ChangePasswordDTO dto)
////        {
////            var user = await _userRepository.GetUserByIdAsync(dto.ApplicationId);

////            if (user == null)
////                return new APIResponseDTO<string>(404, "User not found", null);

////            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword!, dto.NewPassword!);

////            if (!result.Succeeded)
////            {
////                var error = result.Errors.FirstOrDefault()?.Description ?? "Password change failed";
////                return new APIResponseDTO<string>(400, "Password change failed try again", null);
////            }

////            return new APIResponseDTO<string>(200, "Password Changed Successfully", null);
////        }

////    }
////}













//using ELMS.Application.IService;
//using ELMS.Data.Entity;
//using Microsoft.AspNetCore.Identity;
//using ELMS.Application.DTOS.ChangePasswordDTO;
//using ELMS.Data.IRepo;
//using ELMS.Application.DTOS.APIResponse;

//namespace ELMS.Application.Service
//{
//    public class ForgetPasswordService : IForgetPasswordService
//    {
//        private readonly UserManager<AppUser> _userManager;
//        private readonly IEmailService _emailService;
//        private readonly IUserRepository _userRepository;

//        public ForgetPasswordService(
//            UserManager<AppUser> userManager,
//            IEmailService emailService,
//            IUserRepository userRepository)
//        {
//            _userManager = userManager;
//            _emailService = emailService;
//            _userRepository = userRepository;
//        }

//        public async Task SendResetLinkAsync(string email)
//        {
//            try
//            {
//                var user = await _userManager.FindByEmailAsync(email);
//                if (user == null) return;

//                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

//                var frontendUrl = "http://localhost:5173/resetpassword";

//                var encodedToken = Uri.EscapeDataString(token);
//                var encodedEmail = Uri.EscapeDataString(email);

//                var resetLink = $"{frontendUrl}?email={encodedEmail}&token={encodedToken}";

//                var emailBody = $@"
//                    <p>You requested to reset your password.</p>
//                    <p>
//                        <a href='{resetLink}'>Reset Password</a>
//                    </p>
//                    <p>This link will expire automatically.</p>
//                ";

//                await _emailService.SendEmailAsync(
//                    email,
//                    "Reset Your Password",
//                    emailBody
//                );
//            }
//            catch (Exception)
//            {
//                // In real projects, log this error
//                throw new Exception("Failed to send password reset email.");
//            }
//        }

//        public async Task ResetPasswordAsync(string email, string token, string newPassword)
//        {
//            try
//            {
//                var user = await _userManager.FindByEmailAsync(email);
//                if (user == null)
//                    throw new Exception("Invalid request");

//                var result = await _userManager.ChangePasswordAsync(
//                    user,
//                    token,
//                    newPassword
//                );

//                if (!result.Succeeded)
//                    throw new Exception(result.Errors.First().Description);
//            }
//            catch (Exception)
//            {
//                throw new Exception("Password reset failed. Please try again.");
//            }
//        }

//        public async Task<APIResponseDTO<string>> ChangePasswordAsync(ChangePasswordDTO dto)
//        {
//            try
//            {
//                var user = await _userRepository.GetUserByIdAsync(dto.ApplicationId);

//                if (user == null)
//                    return new APIResponseDTO<string>(404, "User not found", null);

//                var result = await _userManager.ChangePasswordAsync(
//                    user,
//                    dto.CurrentPassword!,
//                    dto.NewPassword!
//                );

//                if (!result.Succeeded)
//                {
//                    var error = result.Errors.FirstOrDefault()?.Description ?? "Password change failed";
//                    return new APIResponseDTO<string>(400, "Password change failed, try again", null);
//                }

//                return new APIResponseDTO<string>(200, "Password Changed Successfully", null);
//            }
//            catch (Exception)
//            {
//                return new APIResponseDTO<string>(
//                    500,
//                    "An error occurred while changing the password",
//                    null
//                );
//            }
//        }
//    }
//}
