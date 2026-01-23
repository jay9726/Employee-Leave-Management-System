using ELMS.Application.DTOS.DepartmentDTO;
using ELMS.Application.IService;
using Microsoft.AspNetCore.Mvc;

namespace ELMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        
        [HttpGet("onlyDepartment")]
        public async Task<IActionResult> GetOnlyDepartmentAsync()
        {
            var response = await _departmentService.GetOnlyDepartmentAsync();
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAllDepartment([FromQuery] int page = 1)
        {
            var response = await _departmentService.GetAllDepartmentAsync(page);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpGet("departmentCount")]
        public async Task<IActionResult> GetDepartmentCount()
        {
            var response = await _departmentService.GetDepartmentCountAsync();
            return Ok(response);
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            var response = await _departmentService.GetDepartmentByIdAsync(id);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpPost]
        public async Task<IActionResult> AddDepartment([FromBody] AddDepartmentDTO addDepartmentDTO)
        {
            var response = await _departmentService.AddDepartmentAsync(addDepartmentDTO);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(
            int id,
            [FromBody] AddDepartmentDTO addDepartmentDTO)
        {
            var response = await _departmentService.UpdateDepartmentAsync(id, addDepartmentDTO);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var response = await _departmentService.DeleteDepartmentAsync(id);
            return StatusCode(response.StatusCode, response);
        }
    }
}
