using ELMS.Application.IService;
using ELMS.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ELMS.Application.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string? CreateToken(AppUser appUser, out DateTime ExpiresAt)
        {
            try
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, appUser.Id.ToString()),
                    new Claim(ClaimTypes.Name, appUser.UserName ?? ""),
                    new Claim(ClaimTypes.Email, appUser.Email ?? ""),
                };

                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
                );

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                ExpiresAt = DateTime.UtcNow.AddMinutes(20);

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: ExpiresAt,
                    signingCredentials: creds
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception)
            {
                ExpiresAt = DateTime.MinValue;
                return null;
            }
        }
    }
}
