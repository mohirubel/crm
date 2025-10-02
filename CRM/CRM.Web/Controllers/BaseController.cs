using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CRM.Web.Controllers
{
    public abstract class BaseController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var path = context.HttpContext.Request.Path.Value?.ToLower();

            // Login path exempted
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
            base.OnActionExecuting(context);
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
        }
    }
}
