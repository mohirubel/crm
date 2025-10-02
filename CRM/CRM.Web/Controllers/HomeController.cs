using System.Diagnostics;
using CRM.Common.Models;
using CRM.Web.Models;
using Microsoft.AspNetCore.Mvc;
using CRM.Service.Interfaces;

namespace CRM.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IAdminService _adminService;

        public HomeController(IAdminService adminService,ILogger<HomeController> logger)
        {
            _logger = logger;
            _adminService = adminService;
        }
        

        public IActionResult Index()
        {
            return RedirectToAction("Login");
           
        }
        public IActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public async Task<ActionResult> Login([FromBody] User request)
        {
            if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { Success = false, Message = "Username and Password are required." });
            }

            var (isSuccess, userId, roleName, userName) = await _adminService.ValidateUser(request.UserName, request.Password);

            if (!isSuccess)
                return Unauthorized(new { Success = false, Message = "Invalid credentials or account is not approved/locked." });


            // session  save
            HttpContext.Session.SetString("UserId", userId.ToString());
            HttpContext.Session.SetString("RoleName", roleName);

            var user = new
            {
                UserId = userId,
                UserName = userName,
                RoleName = roleName,
                Message = "Login Successful."
            };
            return Ok(new { Success = true, data = user });
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
