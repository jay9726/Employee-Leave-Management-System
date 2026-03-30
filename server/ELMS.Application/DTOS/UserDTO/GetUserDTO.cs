namespace ELMS.Application.DTOS.UserDTO
{
    public class GetUserDTO
    {
        public string EmployeeId { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public string? ImagePath { get; set; }
    }
}
