using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Authentication.JWT.EmailService
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string htmlBody);

    }
}
