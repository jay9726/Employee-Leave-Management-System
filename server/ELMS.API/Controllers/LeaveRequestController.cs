//using ELMS.Application.DTOS.LeaveRequestDTO;
//using ELMS.Application.IService;
//using Microsoft.AspNetCore.Mvc;

//namespace ELMS.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LeaveRequestController : ControllerBase
//    {
//        private readonly ILeaveRequestService _leaveRequestService;

//        public LeaveRequestController(ILeaveRequestService leaveRequestService)
//        {
//            _leaveRequestService = leaveRequestService;
//        }



//        [HttpPost("apply")]
//        public async Task<IActionResult> ApplyLeave([FromBody] ApplyLeaveRequestDTO dto)
//        {
//            var response = await _leaveRequestService.ApplyLeaveAsync(dto);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpGet("pendingLeaveRequestCount")]
//        public async Task<IActionResult> GetPendingLeaveRequestCount()
//        {
//            var response = await _leaveRequestService.GetPendingLeaveRequestCountAsync();
//            return Ok(response);
//        }



//        [HttpGet]
//        public async Task<IActionResult> GetAllLeaves()
//        {
//            var response = await _leaveRequestService.GetAllLeaveAsync();
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpGet("user/{applicationId}")]
//        public async Task<IActionResult> GetLeaveByUserId(int applicationId)
//        {
//            var response = await _leaveRequestService.GetLeaveByUserIdAsync(applicationId);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpPut("update")]
//        public async Task<IActionResult> UpdateLeave([FromBody] UpdateLeaveRequestDTO dto)
//        {
//            var response = await _leaveRequestService.UpdateLeaveAsync(dto);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpGet("status/{status}")]
//        public async Task<IActionResult> GetLeaveByStatus(string status)
//        {
//            var response = await _leaveRequestService.GetAllLeaveByStatusAsync(status);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpGet("department/{departmentId}")]
//        public async Task<IActionResult> GetLeaveByDepartment(int departmentId)
//        {
//            var response = await _leaveRequestService
//                .GetAllLeaveByDepartmentIdAsync(departmentId);

//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpPut("cancel/{id}")]
//        public async Task<IActionResult> CancelLeave(int id)
//        {
//            var response = await _leaveRequestService.CanceledLeaveAsync(id);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpGet("date-range")]
//        public async Task<IActionResult> GetLeaveByDateRange(
//            [FromQuery] DateTime fromDate,
//            [FromQuery] DateTime toDate)
//        {
//            var response = await _leaveRequestService
//                .GetAllLeaveByDateRangeAsync(fromDate, toDate);

//            return StatusCode(response.StatusCode, response);
//        }

//    }
//}


















using ELMS.Application.DTOS.LeaveRequestDTO;
using ELMS.Application.IService;
using ELMS.Domain.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ELMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestService _leaveRequestService;

        public LeaveRequestController(ILeaveRequestService leaveRequestService)
        {
            _leaveRequestService = leaveRequestService;
        }

        // POST: api/LeaveRequest/apply
        //[Authorize(Roles ="Employee")]
        [HttpPost("apply")]
        public async Task<IActionResult> ApplyLeave([FromBody] ApplyLeaveRequestDTO dto)
            {
            var response = await _leaveRequestService.ApplyLeaveAsync(dto);
            return StatusCode(response.StatusCode, response);
        }

        // GET: api/LeaveRequest/pendingLeaveRequestCount
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet("pendingLeaveRequestCount")]
        public async Task<IActionResult> GetPendingLeaveRequestCount()
        {
            var response = await _leaveRequestService.GetPendingLeaveRequestCountAsync();
            return StatusCode(response.StatusCode, response);
        }

        // GET: api/LeaveRequest
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet]
        public async Task<IActionResult> GetAllLeaves()
        {
            var response = await _leaveRequestService.GetAllLeaveAsync();
            return StatusCode(response.StatusCode, response);
        }

        // GET: api/LeaveRequest/user/{applicationId}
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet("user/{employeeId:guid}")]
        public async Task<IActionResult> GetLeaveByUserId(Guid employeeId)
        {
            var response = await _leaveRequestService.GetLeaveByUserIdAsync(employeeId);
            return StatusCode(response.StatusCode, response);
        }

        // PUT: api/LeaveRequest/update
        //[Authorize(Roles ="Admin, Employee")]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateLeave([FromBody] UpdateLeaveRequestDTO dto)
        {
            var response = await _leaveRequestService.UpdateLeaveAsync(dto);
            return StatusCode(response.StatusCode, response);
        }

        // GET: api/LeaveRequest/status/{status}
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetLeaveByStatus(LeaveStatus status)
        {
            var response = await _leaveRequestService.GetAllLeaveByStatusAsync(status);
            return StatusCode(response.StatusCode, response);
        }

        // GET: api/LeaveRequest/department/{departmentId}
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet("department/{departmentId:guid}")]
        public async Task<IActionResult> GetLeaveByDepartment(Guid departmentId)
        {
            var response = await _leaveRequestService
                .GetAllLeaveByDepartmentIdAsync(departmentId);

            return StatusCode(response.StatusCode, response);
        }

        // PUT: api/LeaveRequest/cancel/{id}
        //[Authorize(Roles ="Admin, Employee")]
        [HttpPut("cancel/{id:guid}")]
        public async Task<IActionResult> CancelLeave(Guid id)
        {
            var response = await _leaveRequestService.CanceledLeaveAsync(id);
            return StatusCode(response.StatusCode, response);
        }

        // GET: api/LeaveRequest/date-range?fromDate=2026-01-01&toDate=2026-01-10
        //[Authorize(Roles ="Admin, Employee")]
        [HttpGet("date-range")]
        public async Task<IActionResult> GetLeaveByDateRange(
            [FromQuery] DateTime fromDate,
            [FromQuery] DateTime toDate)
        {
            var response = await _leaveRequestService
                .GetAllLeaveByDateRangeAsync(fromDate, toDate);

            return StatusCode(response.StatusCode, response);
        }
    }
}
