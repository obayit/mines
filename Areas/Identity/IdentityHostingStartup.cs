using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using mines.Areas.Identity.Data;

[assembly: HostingStartup(typeof(mines.Areas.Identity.IdentityHostingStartup))]
namespace mines.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<minesIdentityDbContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("minesIdentityDbContextConnection")));

                services.AddDefaultIdentity<IdentityUser>()
                    .AddEntityFrameworkStores<minesIdentityDbContext>();
            });
        }
    }
}