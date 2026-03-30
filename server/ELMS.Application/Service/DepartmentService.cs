//using ELMS.Application.DTOS.APIResponse;
//using ELMS.Application.DTOS.DepartmentDTO;
//using ELMS.Application.IService;
//using ELMS.Data.Entity;
//using ELMS.Data.IRepo;


//namespace ELMS.Application.Service
//{
//    public class DepartmentService : IDepartmentService
//    {
//        private readonly IDepartmentRepository _departmentRepository;

//        public DepartmentService(IDepartmentRepository repo)
//        {
//            _departmentRepository = repo;
//        }



//        public async Task<APIResponseDTO<int>> GetDepartmentCountAsync()
//        {
//            var res = await _departmentRepository.GetDepartmentCountAsync();
//            return new APIResponseDTO<int>(200, "Deparment Count Fetched Successfully", res);
//        }


//        public async Task<APIResponseDTO<IEnumerable<GetDepartmentDTO>>> GetOnlyDepartmentAsync()
//        {
//            var departments = await _departmentRepository.GetOnlyDepartmentAsync();
//            var data = departments.Select(x => new GetDepartmentDTO
//            {
//                Id = x.DepartmentId,
//                DepartmentName = x.DepartmentName,
//            });
//            return new APIResponseDTO<IEnumerable<GetDepartmentDTO>>(200, "Department Fetched Sucessfully", data);
//        }


//        public async Task<APIResponseDTO<IEnumerable<GetDepartmentDTO>>> GetAllDepartmentAsync(int page)
//        {
//            var departments = await _departmentRepository.GetAllDepartmentAsync(page);

//            var data = departments.Select(x => new GetDepartmentDTO
//            {
//                Id = x.DepartmentId,
//                DepartmentName = x.DepartmentName,
//                Description = x.Description,
//            });
//            return new APIResponseDTO<IEnumerable<GetDepartmentDTO>>(200, "Department Fetched Sucessfully", data);
//        }



//        public async Task<APIResponseDTO<GetDepartmentDTO>> GetDepartmentByIdAsync(int id)
//        {
//            var department = await _departmentRepository.GetDepartmenByIdAsync(id);

//            if (department == null)
//            {
//                return new APIResponseDTO<GetDepartmentDTO>(404, "Department not found", null);
//            }

//            var data = new GetDepartmentDTO
//            {
//                Id = department.DepartmentId,
//                DepartmentName = department.DepartmentName,
//                Description = department.Description,
//            };

//            return new APIResponseDTO<GetDepartmentDTO>(200, "Department fetched successfully", data);
//        }



//        public async Task<APIResponseDTO<AddDepartmentDTO>> AddDepartmentAsync(AddDepartmentDTO dto)
//        {
//            var dept = new Department
//            {
//                DepartmentName = dto.DepartmentName,
//                Description = dto.Description,
//            };

//            var result = await _departmentRepository.AddDepartmentAsync(dept);
//            var data = new AddDepartmentDTO
//            {
//                DepartmentName = dto.DepartmentName,
//                Description = dto.Description,
//            };

//            return new APIResponseDTO<AddDepartmentDTO>(201, "Department created successfully", data);
//        }



//        public async Task<APIResponseDTO<AddDepartmentDTO>> UpdateDepartmentAsync(int id, AddDepartmentDTO dto)
//        {
//            var existingdept = await _departmentRepository.GetDepartmenByIdAsync(id);

//            if (existingdept == null)
//            {
//                return new APIResponseDTO<AddDepartmentDTO>(404, "Department not found", null);
//            }

//            existingdept.DepartmentName = dto.DepartmentName;
//            existingdept.Description = dto.Description;

//            var updated = await _departmentRepository.UpdateDepartmentAsync(id, existingdept);

//            var data = new AddDepartmentDTO
//            {

//                DepartmentName = dto.DepartmentName,
//                Description = dto.Description,
//            };

//            return new APIResponseDTO<AddDepartmentDTO>(200, "Department updated successfully", data);
//        }



//        public async Task<APIResponseDTO<GetDepartmentDTO>> DeleteDepartmentAsync(int id)
//        {
//            var existing = await _departmentRepository.GetDepartmenByIdAsync(id);

//            if (existing == null)
//            {
//                return new APIResponseDTO<GetDepartmentDTO>(404, "Department not found", null);
//            }

//            var deleted = await _departmentRepository.DeleteDepartmentAsync(id);

//            var data = new GetDepartmentDTO
//            {
//                Id = existing.DepartmentId,
//                DepartmentName = existing.DepartmentName,
//                Description = existing.Description,
//            };

//            return new APIResponseDTO<GetDepartmentDTO>(200, "Department deleted successfully", data);
//        }

//    }
//}













using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.DepartmentDTO;
using ELMS.Application.ICommon;
using ELMS.Application.IService;
using ELMS.Domain.Entities;

namespace ELMS.Application.Service
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DepartmentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<APIResponseDTO<int>> GetDepartmentCountAsync()
        {
            try
            {
                var res = await _unitOfWork.DepartmentRepository.GetDepartmentCountAsync();
                return new APIResponseDTO<int>(200, "Department Count Fetched Successfully", res);
            }
            catch (Exception)
            {
                return new APIResponseDTO<int>(500, "An error occurred while fetching department count", 0);
            }
        }

        public async Task<APIResponseDTO<IEnumerable<GetDepartmentDTO>>> GetOnlyDepartmentAsync()
        {
            try
            {
                var departments = await _unitOfWork.DepartmentRepository.GetOnlyDepartmentAsync();

                var data = departments.Select(x => new GetDepartmentDTO
                {
                    DepartmentId = x.DepartmentId.ToString(),
                    DepartmentName = x.DepartmentName,
                });

                return new APIResponseDTO<IEnumerable<GetDepartmentDTO>>(200, "Department Fetched Successfully", data);
            }
            catch (Exception)
            {
                return new APIResponseDTO<IEnumerable<GetDepartmentDTO>>(
                    500,
                    "An error occurred while fetching departments",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<IEnumerable<GetDepartmentDTO>>> GetAllDepartmentAsync()
        {
            try
            {
                var departments = await _unitOfWork.DepartmentRepository.GetAllDepartmentAsync();

                var data = departments.Select(x => new GetDepartmentDTO
                {
                    DepartmentId = x.DepartmentId.ToString(),
                    DepartmentName = x.DepartmentName,
                    Description = x.Description,
                });

                return new APIResponseDTO<IEnumerable<GetDepartmentDTO>>(200, "Department Fetched Successfully", data);
            }
            catch (Exception)
            {
                return new APIResponseDTO<IEnumerable<GetDepartmentDTO>>(
                    500,
                    "An error occurred while fetching departments",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<GetDepartmentDTO>> GetDepartmentByIdAsync(Guid id)
        {
            try
            {
                var department = await _unitOfWork.DepartmentRepository.GetDepartmenByIdAsync(id);

                if (department == null)
                {
                    return new APIResponseDTO<GetDepartmentDTO>(404, "Department not found", null);
                }

                var data = new GetDepartmentDTO
                {
                    DepartmentId = department.DepartmentId.ToString(),
                    DepartmentName = department.DepartmentName,
                    Description = department.Description,
                };

                return new APIResponseDTO<GetDepartmentDTO>(200, "Department fetched successfully", data);
            }
            catch (Exception)
            {
                return new APIResponseDTO<GetDepartmentDTO>(
                    500,
                    "An error occurred while fetching the department",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<AddDepartmentDTO>> AddDepartmentAsync(AddDepartmentDTO dto)
        {
            try
            {
                var dept = new Department
                {
                    DepartmentName = dto.DepartmentName,
                    Description = dto.Description,
                };

                await _unitOfWork.DepartmentRepository.AddDepartmentAsync(dept);

                var data = new AddDepartmentDTO
                {
                    DepartmentName = dto.DepartmentName,
                    Description = dto.Description,
                };

                return new APIResponseDTO<AddDepartmentDTO>(201, "Department created successfully", data);
            }
            catch (Exception)
            {
                return new APIResponseDTO<AddDepartmentDTO>(
                    500,
                    "An error occurred while creating the department",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<AddDepartmentDTO>> UpdateDepartmentAsync(Guid id, AddDepartmentDTO dto)
        {
            try
            {
                var existingdept = await _unitOfWork.DepartmentRepository.GetDepartmenByIdAsync(id);

                if (existingdept == null)
                {
                    return new APIResponseDTO<AddDepartmentDTO>(404, "Department not found", null);
                }

                existingdept.DepartmentName = dto.DepartmentName;
                existingdept.Description = dto.Description;

                await _unitOfWork.DepartmentRepository.UpdateDepartmentAsync(id, existingdept);

                var data = new AddDepartmentDTO
                {
                    DepartmentName = dto.DepartmentName,
                    Description = dto.Description,
                };

                return new APIResponseDTO<AddDepartmentDTO>(200, "Department updated successfully", data);
            }
            catch (Exception)
            {
                return new APIResponseDTO<AddDepartmentDTO>(
                    500,
                    "An error occurred while updating the department",
                    null
                );
            }
        }

        public async Task<APIResponseDTO<GetDepartmentDTO>> DeleteDepartmentAsync(Guid id)
        {
            try
            {
                var existing = await _unitOfWork.DepartmentRepository.GetDepartmenByIdAsync(id);

                if (existing == null)
                {
                    return new APIResponseDTO<GetDepartmentDTO>(404, "Department not found", null);
                }

                await _unitOfWork.DepartmentRepository.DeleteDepartmentAsync(id);

                var data = new GetDepartmentDTO
                {
                    DepartmentId = existing.DepartmentId.ToString(),
                    DepartmentName = existing.DepartmentName,
                    Description = existing.Description,
                };

                return new APIResponseDTO<GetDepartmentDTO>(200, "Department deleted successfully", data);
            }
            catch (Exception)
            {
                return new APIResponseDTO<GetDepartmentDTO>(
                    500,
                    "An error occurred while deleting the department",
                    null
                );
            }
        }
    }
}
