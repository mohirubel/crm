using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using CRM.Data;
//using CRM.Data.Repositories;
//using CRM.Services;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
//using CRM.Common.Helper;
using CRM.Common.Models;
using CRM.Service.Implementations;
using CRM.Service.Interfaces;
using CRM.Data.Repositories;
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
            //services.Configure<FtpSettings>(Configuration.GetSection("FtpSettings"));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder
                        .AllowAnyOrigin() // or .WithOrigins("https://example.com") for specific origins
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            services.AddControllers();

           
            // Database context
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
            //services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
            //    .AddRoles<IdentityRole>()
            //    .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

    //        services.AddControllers()
    //.AddNewtonsoftJson(options =>
    //    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);



            services.AddControllersWithViews();
            services.AddRazorPages();

            //services.AddScoped<FtpUploader>();


            // Repositories
            //services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAccountReportRepository, AccountReportRepository>();
            //services.AddScoped<IGenericRepository<T>, DapperRepository<T>>();


            // Register Services
            //services.AddScoped<IBrandService, BrandService>();
            services.AddScoped<IAccountService, AccountService>();
          

            // Register Swagger services
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "My API",
                    Version = "v1",
                    Description = @"
A simple example ASP.NET Core Web API

<div  style='display: flex; flex-wrap: wrap;'>
   <h1> Download Json File </h1>
    <div  style='flex: 1; padding-right: 10px;'>
        <table style='width: 100%; border-collapse: collapse;'>
            <tr>
                <th style='text-align: left; padding: 8px; border-bottom: 2px solid #000;'>Name</th>
                <th style='text-align: left; padding: 8px; border-bottom: 2px solid #000;'>Download</th>
            </tr>
            <tr>
                <td style='padding: 8px; border-bottom: 1px solid #ddd;'>Account</td>
                <td style='padding: 8px; border-bottom: 1px solid #ddd;'>
                    <a href='#' >Download</a>
                </td>
            </tr>
        </table>
    </div>
    <div style='flex: 1; padding-left: 10px;'>
        <table style='width: 100%; border-collapse: collapse;'>
        </table>
    </div>
</div>
",



                    Contact = new OpenApiContact
                    {
                        Name = "Your Name",
                        Email = string.Empty,
                        Url = new Uri("https://twitter.com/yourname"),
                    },
                });
            });


            // Other configurations...
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();

            // app.UseStaticFiles(); // Ensure static files are served

            // Enable serving static files (including files outside of wwwroot)
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
                    System.IO.Path.Combine(env.ContentRootPath, "Download")),
                RequestPath = "/Download"
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = string.Empty; // To serve Swagger UI at application's root (http://localhost:<port>/)

                // Include the custom JavaScript file
               // c.InjectJavascript("/js/swagger-custom.js");

            });
            app.UseCors("AllowSpecificOrigin"); // Enable the CORS policy

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        
    }
}
