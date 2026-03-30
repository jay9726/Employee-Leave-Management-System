
namespace ELMS.Application.DTOS.ChangePasswordDTO
{
    public class ChangePasswordDTO
    {
        public Guid ApplicationId { get; set; }
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
