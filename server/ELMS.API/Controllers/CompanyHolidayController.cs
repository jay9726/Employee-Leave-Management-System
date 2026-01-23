using ELMS.Application.DTOS.CompanyHolidayDTO;
using ELMS.Application.IService;
using Microsoft.AspNetCore.Mvc;

namespace ELMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyHolidayController : ControllerBase
    {
        private readonly ICompanyHolidayService _companyHolidayService;

        public CompanyHolidayController(ICompanyHolidayService companyHolidayService)
        {
            _companyHolidayService = companyHolidayService;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAllCompanyHoliday()
        {
            var response = await _companyHolidayService.getAllCompanyHolidaysAsync();
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompanyHolidayById(int id)
        {
            var response = await _companyHolidayService.getCompanyHolidaysByIdAsync(id);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpPost]
        public async Task<IActionResult> AddCompanyHoliday([FromBody] AddCompanyHolidayDTO companyHoliday)
        {
            var response = await _companyHolidayService.addCompanyHolidayAsync(companyHoliday);
            return StatusCode(response.StatusCode, response);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompanyHoliday(
            int id,
            [FromBody] AddCompanyHolidayDTO companyHoliday)
        {
            var response = await _companyHolidayService.updateCompanyHolidayAsync(id, companyHoliday);
            return StatusCode(response.StatusCode, response);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompanyHoliday(int id)
        {
            var response = await _companyHolidayService.deleteCompanyHolidayAsync(id);
            return StatusCode(response.StatusCode, response);
        }
    }
}
