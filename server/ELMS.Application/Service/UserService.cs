//using ELMS.Application.DTOS.APIResponse;
//using ELMS.Application.DTOS.UserDTO;
//using ELMS.Application.IService;
//using ELMS.Data.Entity;
//using ELMS.Data.IRepo;

//namespace ELMS.Application.Service
//{
//    public class UserService : IUserService
//    {
//        private readonly IUserRepository _userRepository;

//        public UserService(IUserRepository userRepository)
//        {
//            _userRepository = userRepository;
//        }



//        public async Task<APIResponseDTO<int>> GetEmployeeCountAsync()
//        {
//            var res = await _userRepository.GetEmployeeCountAsync();
//            return new APIResponseDTO<int>(200, "Total Employee Count Fetched Sucessfully", res);
//        }



//        public async Task<IEnumerable<GetUserDTO?>> GetAllUserAsync()
//        {
//            var response = await _userRepository.GetAllUserAsync();

//            return response.Select(x => new GetUserDTO
//            {
//                ApplicationId = x.Id,
//                Email = x.Email,
//                FullName = x.FullName,
//                DepartmentId = x.DepartmentId,
//                DepartmentName = x.Department?.DepartmentName,
//                ImagePath = x.ImagePath
//            }).ToList();
//        }



//        public async Task<List<GetUserDTO>?> GetByIdAsync(int id)
//        {
//            var result = await _userRepository.GetUserByIdAsync(id);

//            if (result == null) return null;

//            return new List<GetUserDTO>
//            {
//                new GetUserDTO {
//                ApplicationId = result.Id,
//                Email = result.Email,
//                FullName = result.FullName,
//                DepartmentId = result.DepartmentId,
//                DepartmentName = result.Department?.DepartmentName,
//                ImagePath = result.ImagePath
//                }
//            };
//        }



//        public async Task<GetUserDTO?> UpdateAppUserAsycn(UpdateUserDTO updateUserDTO)
//        {

//            if (updateUserDTO == null || updateUserDTO.ImagePath.Length == 0)
//                return null;

//            var allowedTypes = new[] { "image/jpeg", "image/png", "image/jpg" };

//            if (!allowedTypes.Contains(updateUserDTO.ImagePath.ContentType))
//                return null;

//            var uploadsFolder = Path.Combine(
//                Directory.GetCurrentDirectory(),
//                "wwwroot/uploads/profiles"
//            );

//            if (!Directory.Exists(uploadsFolder))
//                Directory.CreateDirectory(uploadsFolder);

//            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(updateUserDTO.ImagePath.FileName)}";
//            var filePath = Path.Combine(uploadsFolder, fileName);

//            using (var stream = new FileStream(filePath, FileMode.Create))
//            {
//                await updateUserDTO.ImagePath.CopyToAsync(stream);
//            }

//            var imagePath = $"/uploads/profiles/{fileName}";


//            var data = new AppUser
//            {
//                Id = updateUserDTO.ApplicationId,
//                FullName = updateUserDTO.FullName,
//                Email = updateUserDTO.Email,
//                DepartmentId = updateUserDTO.DepartmentId,
//                ImagePath = imagePath,

//            };

//            var result = await _userRepository.UpdateAppUserAsycn(data);

//            if (result == null) return null;

//            return new GetUserDTO
//            {
//                ApplicationId = result.Id,
//                Email = result.Email,
//                FullName = result.FullName,
//                DepartmentId = updateUserDTO.DepartmentId,
//                DepartmentName = result.Department?.DepartmentName,
//                ImagePath = result.ImagePath
//            };
//        }



//        public async Task<GetUserDTO?> DeleteUserAsync(int id)
//        {
//            var result = await _userRepository.DeleteUserAsync(id);
//            if (result == null) return null;
//            return new GetUserDTO
//            {
//                ApplicationId = result.Id,
//                Email = result.Email,
//                FullName = result.FullName,
//                DepartmentName = result.Department?.DepartmentName,
//                ImagePath = result.ImagePath
//            };
//        }

//    }
//}




























using ELMS.Application.DTOS.APIResponse;
using ELMS.Application.DTOS.UserDTO;
using ELMS.Application.ICommon;
using ELMS.Application.IService;
using ELMS.Domain.Entities.Identity;

namespace ELMS.Application.Service
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<APIResponseDTO<int>> GetEmployeeCountAsync()
        {
            try
            {
                var res = await _unitOfWork.UserRepository.GetEmployeeCountAsync();
                return new APIResponseDTO<int>(200, "Total Employee Count Fetched Successfully", res);
            }
            catch (Exception)
            {
                return new APIResponseDTO<int>(
                    500,
                    "An error occurred while fetching employee count",
                    0
                );
            }
        }

        public async Task<IEnumerable<GetUserDTO?>> GetAllUserAsync()
        {
            try
            {
                var response = await _unitOfWork.UserRepository.GetAllUserAsync();

                return response.Select(x => new GetUserDTO
                {
                    EmployeeId = x.Id.ToString(),
                    Email = x.Email,
                    FullName = x.FullName,
                    DepartmentId = x.DepartmentId.ToString(),
                    DepartmentName = x.Department?.DepartmentName,
                    ImagePath = x.ImagePath
                }).ToList();
            }
            catch (Exception)
            {
                return Enumerable.Empty<GetUserDTO>();
            }
        }

        public async Task<List<GetUserDTO>?> GetByIdAsync(Guid id)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.GetUserByIdAsync(id);

                if (result == null) return null;

                return new List<GetUserDTO>
                {
                    new GetUserDTO
                    {
                        EmployeeId = result.Id.ToString(),
                        Email = result.Email,
                        FullName = result.FullName,
                        DepartmentId = result.DepartmentId.ToString(),
                        DepartmentName = result.Department?.DepartmentName,
                        ImagePath = result.ImagePath
                    }
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<GetUserDTO?> UpdateAppUserAsycn(UpdateUserDTO updateUserDTO)
        {
            try
            {
                if (updateUserDTO == null || updateUserDTO.ImagePath.Length == 0)
                    return null;

                var allowedTypes = new[] { "image/jpeg", "image/png", "image/jpg" };

                if (!allowedTypes.Contains(updateUserDTO.ImagePath.ContentType))
                    return null;

                var uploadsFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot/uploads/profiles"
                );

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(updateUserDTO.ImagePath.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await updateUserDTO.ImagePath.CopyToAsync(stream);
                }

                var imagePath = $"/uploads/profiles/{fileName}";

                var data = new Employee
                {
                    Id = updateUserDTO.ApplicationId,
                    FullName = updateUserDTO.FullName,
                    Email = updateUserDTO.Email,
                    DepartmentId = updateUserDTO.DepartmentId,
                    ImagePath = imagePath,
                };

                var result = await _unitOfWork.UserRepository.UpdateAppUserAsycn(data);

                if (result == null) return null;

                return new GetUserDTO
                {
                    EmployeeId = result.Id.ToString(),
                    Email = result.Email,
                    FullName = result.FullName,
                    DepartmentId = updateUserDTO.DepartmentId.ToString(),
                    DepartmentName = result.Department?.DepartmentName,
                    ImagePath = result.ImagePath
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<GetUserDTO?> DeleteUserAsync(Guid id)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.DeleteUserAsync(id);

                if (result == null) return null;

                return new GetUserDTO
                {
                    EmployeeId = result.Id.ToString(),
                    Email = result.Email,
                    FullName = result.FullName,
                    DepartmentName = result.Department?.DepartmentName,
                    ImagePath = result.ImagePath
                };
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
