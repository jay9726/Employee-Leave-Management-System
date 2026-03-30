using ELMS.Application.IRepositories;

namespace ELMS.Application.ICommon
{
    public interface IUnitOfWork : IDisposable
    {
        ICompanyHolidayRepository CompanyHolidayRepository {  get; }
        IDepartmentRepository DepartmentRepository {  get; }
        ILeaveRequestRepository LeaveRequestRepository {  get; }
        IUserRepository UserRepository{  get; }
        Task Save();
    }
}
