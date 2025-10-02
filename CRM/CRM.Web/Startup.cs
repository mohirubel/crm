using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using CRM.Data;
using Microsoft.AspNetCore.Identity;
using CRM.Common.Models;
using CRM.Service.Implementations;
using CRM.Service.Interfaces;
using CRM.Data.Repositories;
using CRM.Services.Implementations;
namespace CRM.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            // Database context
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();


            services.AddControllersWithViews();
            services.AddRazorPages();


            // Repositories
            //services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAccountReportRepository, AccountReportRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();


            // Register Services
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAdminService, AdminService>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSession();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
           

            app.UseCors("AllowSpecificOrigin");


            // Enable serving static files (including files outside of wwwroot)
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
                    System.IO.Path.Combine(env.ContentRootPath, "Download")),
                RequestPath = "/Download"
            });

          
            app.UseEndpoints(endpoints =>
            {
                // Default MVC route
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }

        
    }
}
