using ELMS.Application.IService;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace ELMS.Application.Service
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                var smtp = _configuration.GetSection("SmtpSettings");

                using var message = new MailMessage
                {
                    From = new MailAddress(
                        smtp["FromEmail"]!,
                        smtp["FromName"]
                    ),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                message.To.Add(toEmail);

                using var client = new SmtpClient(smtp["Host"])
                {
                    Port = int.Parse(smtp["Port"]!),
                    Credentials = new NetworkCredential(
                        smtp["Username"],
                        smtp["Password"]
                    ),
                    EnableSsl = true,
                    UseDefaultCredentials = false
                };

                await client.SendMailAsync(message);
            }
            catch (SmtpException)
            {
                // SMTP-specific errors (connection, auth, etc.)
                throw new Exception("Email service is currently unavailable. Please try again later.");
            }
            catch (Exception)
            {
                // General errors
                throw new Exception("An error occurred while sending the email.");
            }
        }
    }
}
