//using ELMS.Application.DTOS.CompanyHolidayDTO;
//using ELMS.Application.DTOS.DepartmentDTO;
//using ELMS.Application.IService;
//using ELMS.Application.Service;
//using ELMS.Data.Entity;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace ELMS.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CompanyHolidayController : ControllerBase
//    {
//        private readonly ICompanyHolidayService _companyHolidayService;

//        public CompanyHolidayController(ICompanyHolidayService companyHolidayService)
//        {
//            _companyHolidayService = companyHolidayService;
//        }



//        [HttpGet]
//        public async Task<IActionResult> GetAllCompanyHoliday()
//        {
//            var response = await _companyHolidayService.getAllCompanyHolidaysAsync();
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetCompanyholidayById(int id)
//        {
//            var response = await _companyHolidayService.getCompanyHolidaysByIdAsync(id);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpPost]
//        public async Task<IActionResult> AddCompanyHoliday([FromBody] AddCompanyHolidayDTO companyHoliday)
//        {
//            var response = await _companyHolidayService.addCompanyHolidayAsync(companyHoliday);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateCompanyHoliday(int id, AddCompanyHolidayDTO companyHoliday)
//        {
//            var response = await _companyHolidayService.updateCompanyHolidayAsync(id, companyHoliday);
//            return StatusCode(response.StatusCode, response);
//        }



//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteCompanyHoliday(int id)
//        {
//            var response = await _companyHolidayService.deleteCompanyHolidayAsync(id);
//            return StatusCode(response.StatusCode, response);
//        }

//    }
//}





using ELMS.Application.DTOS.CompanyHolidayDTO;
using ELMS.Application.IService;
using Microsoft.AspNetCore.Authorization;
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

        //[Authorize(Roles ="Admin,Employee")]
        // GET: api/CompanyHoliday
        [HttpGet]
        public async Task<IActionResult> GetAllCompanyHoliday()
        {
            var response = await _companyHolidayService.getAllCompanyHolidaysAsync();
            return StatusCode(response.StatusCode, response);
        }   

        // GET: api/CompanyHoliday/{id}
        //[Authorize(Roles ="Admin")]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetCompanyHolidayById(Guid id)
        {
            var response = await _companyHolidayService.getCompanyHolidaysByIdAsync(id);
            return StatusCode(response.StatusCode, response);
        }

        // POST: api/CompanyHoliday
        [HttpPost]
        public async Task<IActionResult> AddCompanyHoliday([FromBody] AddCompanyHolidayDTO companyHoliday)
        {
            var response = await _companyHolidayService.addCompanyHolidayAsync(companyHoliday);
            return StatusCode(response.StatusCode, response);
        }

        // PUT: api/CompanyHoliday/{id}
        //[Authorize(Roles ="Admin")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateCompanyHoliday(Guid id, [FromBody] AddCompanyHolidayDTO companyHoliday)
        {
            var response = await _companyHolidayService.updateCompanyHolidayAsync(id, companyHoliday);
            return StatusCode(response.StatusCode, response);
        }

        // DELETE: api/CompanyHoliday/{id}
        //[Authorize(Roles ="Admin")]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteCompanyHoliday(Guid id)
        {
            var response = await _companyHolidayService.deleteCompanyHolidayAsync(id);
            return StatusCode(response.StatusCode, response);
        }
    }
}
