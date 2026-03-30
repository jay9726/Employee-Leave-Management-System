//using ELMS.Application.DTOS.APIResponse;
//using ELMS.Application.DTOS.CompanyHolidayDTO;
//using ELMS.Application.DTOS.DepartmentDTO;
//using ELMS.Application.IService;
//using ELMS.Data.Entity;
//using ELMS.Data.IRepo;

//namespace ELMS.Application.Service
//{
//    public class CompanyHolidayService : ICompanyHolidayService
//    {

//        private readonly ICompanyHolidayRepository _companyHolidayRepository;

//        public CompanyHolidayService(ICompanyHolidayRepository companyHolidayRepository) 
//        {
//            _companyHolidayRepository = companyHolidayRepository;
//        }


//        public async Task<APIResponseDTO<IEnumerable<GetCompanyHolidayDTO>>> getAllCompanyHolidaysAsync()
//        {
//            var holiday = await _companyHolidayRepository.getAllCompanyHolidaysAsync();

//            var data = holiday.Select(x => new GetCompanyHolidayDTO
//            {
//                Id = x.Id,
//                Name = x.Name,
//                Date = x.Date,
//                Day = x.Day,
//                HolidayType = x.HolidayType.ToString() 
//            }).ToList();

//            return new APIResponseDTO<IEnumerable<GetCompanyHolidayDTO>>(200, "Company Holiday Sucessfully", data);
//        }



//        public async Task<APIResponseDTO<GetCompanyHolidayDTO?>> getCompanyHolidaysByIdAsync(int id)
//        {
//            var holiday = await _companyHolidayRepository.getCompanyHolidaysByIdAsync(id);
//            if (holiday == null)
//            {
//                return new APIResponseDTO<GetCompanyHolidayDTO?>(404, "Company Holiday not found", null);
//            }

//            var data = new GetCompanyHolidayDTO
//            {
//                Id = holiday.Id,
//                Name = holiday.Name,
//                Day = holiday.Day,
//                Date = holiday.Date,
//                HolidayType = holiday.HolidayType.ToString()
//            };

//            return new APIResponseDTO<GetCompanyHolidayDTO?>(200, "Department fetched successfully", data);
//        }



//        public async Task<APIResponseDTO<CompanyHoliday?>> addCompanyHolidayAsync(AddCompanyHolidayDTO companyHoliday)
//        {

//            var comholiday = new CompanyHoliday
//            {
//                Name = companyHoliday.Name,
//                Date = companyHoliday.Date,
//                Day = companyHoliday.Day,
//                HolidayType = companyHoliday.HolidayType,
//            };

//            var holiday = await _companyHolidayRepository.addCompanyHolidayAsync(comholiday);

//                return new APIResponseDTO<CompanyHoliday?>(201, "Company Holiday Added Sucessfullu", holiday);
//        }



//        public async Task<APIResponseDTO<CompanyHoliday?>> updateCompanyHolidayAsync(int id, AddCompanyHolidayDTO companyHoliday)
//        {

//            var comholiday = new CompanyHoliday
//            {
//                Name = companyHoliday.Name,
//                Date = companyHoliday.Date,
//                Day = companyHoliday.Day,
//                HolidayType = companyHoliday.HolidayType,
//            };

//            var holiday = await _companyHolidayRepository.updateCompanyHolidayAsync(id, comholiday);
//            if(holiday == null)
//            {
//                return new APIResponseDTO<CompanyHoliday?>(404, "Company Holiday not found", null);
//            }

//            return new APIResponseDTO<CompanyHoliday?>(200, "Company Holiday updated successfully", holiday);
//        }



//        public async Task<APIResponseDTO<CompanyHoliday?>> deleteCompanyHolidayAsync(int id)
//        {
//            var existing = await _companyHolidayRepository.getCompanyHolidaysByIdAsync(id);

//            if (existing == null)
//            {
//                return new APIResponseDTO<CompanyHoliday?>(404, "Department not found", null);
//            }

//            var holiday = await _companyHolidayRepository.deleteCompanyHolidayAsync(id);

//            return new APIResponseDTO<CompanyHoliday?>(200, "Company Holiday deleted successfully", holiday);

//        }

//    }
//}

















using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.CompanyHolidayDTO;
using ELMS.Application.ICommon;
using ELMS.Application.IService;
using ELMS.Domain.Entities;

namespace ELMS.Application.Service
{
    public class CompanyHolidayService : ICompanyHolidayService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CompanyHolidayService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<APIResponseDTO<IEnumerable<GetCompanyHolidayDTO>>> getAllCompanyHolidaysAsync()
        {
            try
            {
                var holiday = await _unitOfWork.CompanyHolidayRepository.getAllCompanyHolidaysAsync();

                var data = holiday.Select(x => new GetCompanyHolidayDTO
                {
                    CompanyHolidayId = x.CompanyHolidayId.ToString(),
                    Name = x.Name,
                    Date = x.Date,
                    Day = x.Day,
                    HolidayType = x.HolidayType
                }).ToList();

                return new APIResponseDTO<IEnumerable<GetCompanyHolidayDTO>>(
                    200,
                    "Company Holiday fetched successfully",
                    data
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<IEnumerable<GetCompanyHolidayDTO>>(
                    500,
                    "An error occurred while fetching company holidays",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<GetCompanyHolidayDTO?>> getCompanyHolidaysByIdAsync(Guid id)
        {
            try
            {
                var holiday = await _unitOfWork.CompanyHolidayRepository.getCompanyHolidaysByIdAsync(id);

                if (holiday == null)
                {
                    return new APIResponseDTO<GetCompanyHolidayDTO?>(
                        404,
                        "Company Holiday not found",
                        null
                    );
                }

                var data = new GetCompanyHolidayDTO
                {
                    CompanyHolidayId = holiday.CompanyHolidayId.ToString(),
                    Name = holiday.Name,
                    Day = holiday.Day,
                    Date = holiday.Date,
                    HolidayType = holiday.HolidayType
                };

                return new APIResponseDTO<GetCompanyHolidayDTO?>(
                    200,
                    "Company Holiday fetched successfully",
                    data
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<GetCompanyHolidayDTO?>(
                    500,
                    "An error occurred while fetching the company holiday",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<CompanyHoliday?>> addCompanyHolidayAsync(AddCompanyHolidayDTO companyHoliday)
        {
            try
            {
                var comholiday = new CompanyHoliday
                {
                    Name = companyHoliday.Name,
                    Date = companyHoliday.Date,
                    Day = companyHoliday.Day,
                    HolidayType = companyHoliday.HolidayType
                };

                var holiday = await _unitOfWork.CompanyHolidayRepository.addCompanyHolidayAsync(comholiday);

                return new APIResponseDTO<CompanyHoliday?>(
                    201,
                    "Company Holiday added successfully",
                    holiday
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<CompanyHoliday?>(
                    500,
                    "An error occurred while adding the company holiday",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<CompanyHoliday?>> updateCompanyHolidayAsync(Guid id, AddCompanyHolidayDTO companyHoliday)
        {
            try
            {
                var comholiday = new CompanyHoliday
                {
                    Name = companyHoliday.Name,
                    Date = companyHoliday.Date,
                    Day = companyHoliday.Day,
                    HolidayType = companyHoliday.HolidayType
                };

                var holiday = await _unitOfWork.CompanyHolidayRepository.updateCompanyHolidayAsync(id, comholiday);

                if (holiday == null)
                {
                    return new APIResponseDTO<CompanyHoliday?>(
                        404,
                        "Company Holiday not found",
                        null
                    );
                }

                return new APIResponseDTO<CompanyHoliday?>(
                    200,
                    "Company Holiday updated successfully",
                    holiday
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<CompanyHoliday?>(
                    500,
                    "An error occurred while updating the company holiday",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<CompanyHoliday?>> deleteCompanyHolidayAsync(Guid id)
        {
            try
            {
                var existing = await _unitOfWork.CompanyHolidayRepository.getCompanyHolidaysByIdAsync(id);

                if (existing == null)
                {
                    return new APIResponseDTO<CompanyHoliday?>(
                        404,
                        "Company Holiday not found",
                        null
                    );
                }

                var holiday = await _unitOfWork.CompanyHolidayRepository.deleteCompanyHolidayAsync(id);

                return new APIResponseDTO<CompanyHoliday?>(
                    200,
                    "Company Holiday deleted successfully",
                    holiday
                );
            }
            catch (Exception)
            {
                return new APIResponseDTO<CompanyHoliday?>(
                    500,
                    "An error occurred while deleting the company holiday",
                    null
                );
            }
        }
    }
}
