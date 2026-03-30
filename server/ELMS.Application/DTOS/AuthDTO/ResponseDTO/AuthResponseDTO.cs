using Microsoft.AspNetCore.Http;

namespace ELMS.Application.DTOS.AuthDTO.ResponseDTO
{
    public class AuthResponseDTO
    {
        public string? Token { get; set; }
        public AuthUser? AuthUser { get; set; }

    }




    public class AuthUser
    {
        public string? EmployeeId { get; set; }
        public string? Email { get; set; }

        public string? DepartmentId { get; set; }

        public string? FullName { get; set; }

        public string? Role { get; set; }

        public DateTime? ExpiresAt { get; set; }

        public string? ImagePath { get; set; }
    }
}


