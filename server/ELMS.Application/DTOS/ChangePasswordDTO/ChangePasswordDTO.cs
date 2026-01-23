
namespace ELMS.Application.DTOS.ChangePasswordDTO
{
    public class ChangePasswordDTO
    {
        public int ApplicationId { get; set; }
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
