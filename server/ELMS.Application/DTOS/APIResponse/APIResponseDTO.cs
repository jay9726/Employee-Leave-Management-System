namespace ELMS.Application.DTOS.APIResponse
{
    public class APIResponseDTO<T>
    {
        public int StatusCode { get; set; }

        public string Message { get; set; } = string.Empty;

        public T? Data { get; set; }

        public APIResponseDTO(int statusCode, string message, T? data)
        {
            StatusCode = statusCode;
            Message = message;
            Data = data;
        }
    }
}
