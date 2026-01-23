using ELMS.Application.DTOS.AuthDTO.RequestDTO;
using ELMS.Application.DTOS.AuthDTO.ResponseDTO;
using ELMS.Application.IService;
using ELMS.Data.Entity;
using ELMS.Data.IRepo;
using Microsoft.AspNetCore.Identity;

namespace ELMS.Application.Service
{
    public class AuthService : IAuthService
    {
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;
        private readonly UserManager<AppUser> _userManager;

        public AuthService(ITokenService tokenService, IUserRepository userRepository, UserManager<AppUser> userManager)
        {
            _tokenService = tokenService;
            _userRepository = userRepository;
            _userManager = userManager;
        }

        public async Task<AuthResponseDTO?> RegisterAsync(RegisterRequestDTO responseDTO)
        {
            try
            {
                if (responseDTO == null || responseDTO.ImagePath.Length == 0)
                    return null;

                var allowedTypes = new[] { "image/jpeg", "image/png", "image/jpg" };

                if (!allowedTypes.Contains(responseDTO.ImagePath.ContentType))
                    return null;

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

                var user = new AppUser
                {
                    FullName = responseDTO.FullName,
                    UserName = responseDTO.Email,
                    Email = responseDTO.Email,
                    DepartmentId = responseDTO.DepartmentId,
                    ImagePath = imagePath
                };

                var ph = new PasswordHasher<AppUser>();
                user.PasswordHash = ph.HashPassword(user, responseDTO.Password!);

                bool created = await _userRepository.CreateUserAsync(user, responseDTO.Password!);

                if (!created) return null;

                await _userManager.AddToRoleAsync(user, "Employee");

                string token = _tokenService.CreateToken(user, out DateTime ExpiresAt)!;

                return new AuthResponseDTO
                {
                    Token = token,
                    Email = responseDTO.Email,
                    FullName = responseDTO.FullName
                };
            }
            catch (Exception)
            {
                // You can log the error here if needed
                return null;
            }
        }

        public async Task<AuthResponseDTO?> LoginAsync(LoginRequestDTO responseDTO)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(responseDTO.Email!);

                if (user == null) return null;

                var checkPassword = await _userRepository.CheckPasswordAsync(user, responseDTO.Password!);

                if (!checkPassword) return null;

                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.FirstOrDefault();

                var token = _tokenService.CreateToken(user, out DateTime ExpiresAt);

                return new AuthResponseDTO
                {
                    Id = user.Id,
                    departmentId = user.DepartmentId,
                    Token = token,
                    Email = responseDTO.Email,
                    FullName = user.FullName,
                    Role = role,
                    ExpiresAt = ExpiresAt,
                    ImagePath = user.ImagePath
                };
            }
            catch (Exception)
            {
                // You can log the error here if needed
                return null;
            }
        }
    }
}
