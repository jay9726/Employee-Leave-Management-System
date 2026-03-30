using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ELMS.Domain.Common
{
    public abstract class BaseEntity : IdentityUser<Guid>
    {
    }
}
