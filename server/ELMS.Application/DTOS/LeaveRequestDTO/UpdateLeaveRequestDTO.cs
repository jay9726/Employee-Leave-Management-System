namespace ELMS.Application.DTOS.LeaveRequestDTO
{
     public class UpdateLeaveRequestDTO
    {
        public int LeaveRequestId { get; set; }
        public bool Approve { get; set; }
        public int? ReviewedById { get; set; }
        public string? AdminComment { get; set; }
    }
}
