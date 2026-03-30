namespace ELMS.Application.DTOS.LeaveRequestDTO
{
     public class UpdateLeaveRequestDTO
    {
        public Guid LeaveRequestId { get; set; }
        public bool Approve { get; set; }
        public Guid? ReviewedById { get; set; }
        public string? AdminComment { get; set; }
    }
}
