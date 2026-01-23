using ELMS.Application.DTOS.LeaveRequestDTO;
using ELMS.Application.IService;
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


        [HttpPost("apply")]
        public async Task<IActionResult> ApplyLeave([FromBody] ApplyLeaveRequestDTO dto)
        {
            var response = await _leaveRequestService.ApplyLeaveAsync(dto);
            return StatusCode(response.StatusCode, response);
        }


        [HttpGet("pendingLeaveRequestCount")]
        public async Task<IActionResult> GetPendingLeaveRequestCount()
        {
            var response = await _leaveRequestService.GetPendingLeaveRequestCountAsync();
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAllLeaves()
        {
            var response = await _leaveRequestService.GetAllLeaveAsync();
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpGet("user/{applicationId}")]
        public async Task<IActionResult> GetLeaveByUserId(int applicationId)
        {
            var response = await _leaveRequestService.GetLeaveByUserIdAsync(applicationId);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpPut("update")]
        public async Task<IActionResult> UpdateLeave([FromBody] UpdateLeaveRequestDTO dto)
        {
            var response = await _leaveRequestService.UpdateLeaveAsync(dto);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetLeaveByStatus(string status)
        {
            var response = await _leaveRequestService.GetAllLeaveByStatusAsync(status);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpGet("department/{departmentId}")]
        public async Task<IActionResult> GetLeaveByDepartment(int departmentId)
        {
            var response = await _leaveRequestService
                .GetAllLeaveByDepartmentIdAsync(departmentId);

            return StatusCode(response.StatusCode, response);
        }

        
        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelLeave(int id)
        {
            var response = await _leaveRequestService.CanceledLeaveAsync(id);
            return StatusCode(response.StatusCode, response);
        }

        
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
