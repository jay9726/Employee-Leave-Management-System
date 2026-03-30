using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Authentication.JWT.Service
{
    public interface IJwtTokenService
    {
        string GenerateJwtToken(string email, string employeeId, string role);
    }
}
