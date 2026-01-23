

using Microsoft.AspNetCore.Http;

namespace ELMS.Application.DTOS.UserDTO
{
    public class UpdateUserDTO
    {
        public int ApplicationId { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public int? DepartmentId { get; set; }
        public IFormFile? ImagePath { get; set; }
    }
}
