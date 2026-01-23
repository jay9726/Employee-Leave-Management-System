using ELMS.Data.Entity;

namespace ELMS.Application.IService
{
    public interface ITokenService
    {
        string? CreateToken(AppUser appUser, out DateTime ExpiresAt);
    }
}
