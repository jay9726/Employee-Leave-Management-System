using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.AuthDTO.RequestDTO;
using ELMS.Application.DTOS.AuthDTO.ResponseDTO;
using ELMS.Application.DTOS.ChangePasswordDTO;
using ELMS.Application.DTOS.ResetPasswordDTO;
using ELMS.Application.IRepositories;
using ELMS.Authentication.JWT.EmailService;
using ELMS.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace ELMS.Authentication.JWT.Service
{
    public class AuthService : IAuthService
    {
        private readonly IJwtTokenService _tokenService;
        private readonly IUserRepository _userRepository;
        private readonly UserManager<Employee> _userManager;
        private readonly IEmailService _emailService;

        public AuthService(IJwtTokenService tokenService, IUserRepository userRepository, UserManager<Employee> userManager, IEmailService emailService)
        {
            _tokenService = tokenService;
            _userRepository = userRepository;
            _userManager = userManager;
            _emailService = emailService;
        }


        public async Task<(bool Success, AuthResponseDTO? Data, string Message)> LoginAsync(LoginRequestDTO responseDTO)
        {
            var user = await _userRepository.GetUserByEmailAsync(responseDTO.Email!);
            if (user == null)
                return (false, null, "Email or Password Invalid");

            var ok = await _userRepository.CheckPasswordAsync(user, responseDTO.Password!);

            if (!ok)
                return (false, null, "Email or Password Invalid");

            var roles = await _userRepository.GetRolesAsync(user);

            var role = roles?.FirstOrDefault() ?? string.Empty;

            var token = _tokenService.GenerateJwtToken(user.Email!, user.Id.ToString(), role);
            var expiresAt = DateTime.UtcNow.AddHours(1);



            var authUser = new AuthUser
            {
                EmployeeId = user.Id.ToString(),
                Role = role,
                ExpiresAt = expiresAt,
                DepartmentId = user.DepartmentId.ToString(),
                FullName = user.FullName,
                Email = user.Email,
                ImagePath = user.ImagePath,
            };

            var res = new AuthResponseDTO
            {
                Token = token,
                AuthUser = authUser
            };

            return (true, res, "Login successful");
        }


        public async Task<(bool Success, AuthResponseDTO? data, string Message)> RegisterAsync(RegisterRequestDTO responseDTO)
        {
            try
            {
                if (responseDTO == null || responseDTO.ImagePath!.Length == 0)
                    return (false, null, "Invalid Data");

                var existingEmail = await _userRepository.ExistEmail(responseDTO.Email!);
                if (existingEmail != null) return (false, null, "Email Alredy Exists!!!"); 

                var allowedTypes = new[] { "image/jpeg", "image/png", "image/jpg" };

                if (!allowedTypes.Contains(responseDTO.ImagePath.ContentType))
                    return (false, null, "Invalid Data"); ;

                var uploadsFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot/uploads/profiles"
                );

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(responseDTO.ImagePath.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await responseDTO.ImagePath.CopyToAsync(stream);
                }

                var imagePath = $"/uploads/profiles/{fileName}";

                var user = new Employee
                {
                    FullName = responseDTO.FullName,
                    UserName = responseDTO.Email,
                    Email = responseDTO.Email,
                    DepartmentId = Guid.Parse(responseDTO.DepartmentId),
                    ImagePath = imagePath
                };

                var ph = new PasswordHasher<Employee>();
                user.PasswordHash = ph.HashPassword(user, responseDTO.Password!);

                bool created = await _userRepository.CreateUserAsync(user, responseDTO.Password!);

                if (!created) return (false, null, "Fail To Create Employee"); 

                await _userManager.AddToRoleAsync(user, "Employee");

                var res = new AuthResponseDTO
                {
                    Token = "",
                };

                return (true, res, "Register Succsfully");
            }
            catch (Exception ex)
            {
                // You can log the error here if needed
                return (false, null, ex.Message);
            }
        }






        public async Task SendResetLinkAsync(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null) return;

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var frontendUrl = "http://localhost:5173/resetpassword";

                var encodedToken = Uri.EscapeDataString(token);
                var encodedEmail = Uri.EscapeDataString(email);

                var resetLink = $"{frontendUrl}?email={encodedEmail}&token={encodedToken}";

                var emailBody = $@"
                    <p>You requested to reset your password.</p>
                    <p>
                        <a href='{resetLink}'>Reset Password</a>
                    </p>
                    <p>This link will expire automatically.</p>
                ";

                await _emailService.SendEmailAsync(
                    email,
                    "Reset Your Password",
                    emailBody
                );
            }
            catch (Exception)
            {
                // In real projects, log this error
                throw new Exception("Failed to send password reset email.");
            }
        }

        public async Task ResetPasswordAsync(ResetPasswordDTO dto)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(dto.Email);
                if (user == null)
                    throw new Exception("Invalid request");

                var result = await _userManager.ChangePasswordAsync(
                    user,
                    dto.Token,
                    dto.NewPassword
                );

                if (!result.Succeeded)
                    throw new Exception(result.Errors.First().Description);
            }
            catch (Exception)
            {
                throw new Exception("Password reset failed. Please try again.");
            }
        }

        public async Task<APIResponseDTO<string>> ChangePasswordAsync(ChangePasswordDTO dto)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(dto.ApplicationId);

                if (user == null)
                    return new APIResponseDTO<string>(404, "User not found", null);

                var result = await _userManager.ChangePasswordAsync(
                    user,
                    dto.CurrentPassword!,
                    dto.NewPassword!
                );

                if (!result.Succeeded)
                {
                    var error = result.Errors.FirstOrDefault()?.Description ?? "Password change failed";
                    return new APIResponseDTO<string>(400, "Password change failed, try again", null);
                }

                return new APIResponseDTO<string>(200, "Password Changed Successfully", null);
            }
            catch (Exception)
            {
                return new APIResponseDTO<string>(
                    500,
                    "An error occurred while changing the password",
                    null
                );
            }
        }


    }
}



























