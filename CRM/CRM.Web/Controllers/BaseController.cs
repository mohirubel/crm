using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CRM.Web.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase, IActionFilter
    {
       
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var path = context.HttpContext.Request.Path.Value?.ToLower();

            
            if (path != null && path.Contains("/login"))
                return;

            // Session check
            var isLoggedIn = context.HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(isLoggedIn))
            {
                context.Result = new UnauthorizedObjectResult(new
                {
                    Success = false,
                    Message = "Please login first."
                });
            }
        }

       
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}
