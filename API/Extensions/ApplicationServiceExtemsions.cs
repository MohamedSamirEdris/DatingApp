using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static  class ApplicationServiceExtemsions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,  IConfiguration config)
        {
            services.AddScoped<ITokenService , TokenService>();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefultConnection"));
            });

            return services;
        }
        
    }
}