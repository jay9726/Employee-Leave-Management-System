using Microsoft.AspNetCore.Http;

namespace ELMS.Application.DTOS.AuthDTO.RequestDTO
{
    public class RegisterRequestDTO
    {
        public string? FullName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public int? DepartmentId { get; set; }

        public IFormFile? ImagePath { get; set; }

    }
}
