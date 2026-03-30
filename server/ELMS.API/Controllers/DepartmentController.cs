//using ELMS.Application.DTOS.DepartmentDTO;
//using ELMS.Application.IService;
//using Microsoft.AspNetCore.Mvc;

//namespace ELMS.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DepartmentController : ControllerBase
//    {
//        private readonly IDepartmentService _departmentService;

//        public DepartmentController(IDepartmentService departmentService)
//        {
//            _departmentService = departmentService;
//        }

//        [HttpGet("onlyDepartment")]
//        public async Task<IActionResult> GetOnlyDepartmentAsync()
//        {
//            var response = await _departmentService.GetOnlyDepartmentAsync();
//            return StatusCode(response.StatusCode, response);
//        }


//        [HttpGet]
//        public async Task<IActionResult> GetAllDepartment(int page)
//        {
//            var response = await _departmentService.GetAllDepartmentAsync(page);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpGet("departmentCount")]
//        public async Task<IActionResult> GetDepartmentCount()
//        {
//            var response = await _departmentService.GetDepartmentCountAsync();
//            return Ok(response);
//        }



//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetDepartmentById(int id)
//        {
//            var response = await _departmentService.GetDepartmentByIdAsync(id);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpPost]
//        public async Task<IActionResult> AddCourse([FromBody] AddDepartmentDTO addDepartmentDTO)
//        {
//            var response = await _departmentService.AddDepartmentAsync(addDepartmentDTO);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateCourse(int id, [FromBody] AddDepartmentDTO addDepartmentDTO)
//        {
//            var response = await _departmentService.UpdateDepartmentAsync(id, addDepartmentDTO);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteDepartment(int id)
//        {
//            var response = await _departmentService.DeleteDepartmentAsync(id);
//            return StatusCode(response.StatusCode, response);
//        }

//    }
//}






















using ELMS.Application.DTOS.DepartmentDTO;
using ELMS.Application.IService;
using Microsoft.AspNetCore.Authorization;
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

        // GET: api/Department/onlyDepartment
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet("onlyDepartment")]
        public async Task<IActionResult> GetOnlyDepartmentAsync()
        {
            var response = await _departmentService.GetOnlyDepartmentAsync();
            return StatusCode(response.StatusCode, response);
        }

        // GET: api/Department?page=1
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet]
        public async Task<IActionResult> GetAllDepartment()
        {
            var response = await _departmentService.GetAllDepartmentAsync();
            return StatusCode(response.StatusCode, response);
        }

        // GET: api/Department/departmentCount
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet("departmentCount")]
        public async Task<IActionResult> GetDepartmentCount()
        {
            var response = await _departmentService.GetDepartmentCountAsync();
            return Ok(response);
        }

        // GET: api/Department/{id}
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetDepartmentById(Guid id)
        {
            var response = await _departmentService.GetDepartmentByIdAsync(id);
            return StatusCode(response.StatusCode, response);
        }

        // POST: api/Department
        //[Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<IActionResult> AddDepartment([FromBody] AddDepartmentDTO addDepartmentDTO)
        {
            var response = await _departmentService.AddDepartmentAsync(addDepartmentDTO);
            return StatusCode(response.StatusCode, response);
        }

        // PUT: api/Department/{id}
        //[Authorize(Roles ="Admin")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateDepartment(Guid id, [FromBody] AddDepartmentDTO addDepartmentDTO)
        {
            var response = await _departmentService.UpdateDepartmentAsync(id, addDepartmentDTO);
            return StatusCode(response.StatusCode, response);
        }

        // DELETE: api/Department/{id}
        //[Authorize(Roles ="Admin")]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteDepartment(Guid id)
        {
            var response = await _departmentService.DeleteDepartmentAsync(id);
            return StatusCode(response.StatusCode, response);
        }
    }
}
