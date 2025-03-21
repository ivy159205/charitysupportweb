using Microsoft.EntityFrameworkCore;
using Charity_Website_API.Models;

namespace Charity_Website_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Charity Website API",
                    Version = "v1"
                });
            });

            // Use connection string from code (you can move this to appsettings.json later)
            builder.Services.AddDbContext<DBCNhom1>(options =>
                options.UseSqlServer("Data Source=cmcsv.ric.vn,10000;Initial Catalog=N10_NHOM1;Persist Security Info=True;User ID=cmcsv;Password=cM!@#2025;encrypt=false")
            );

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder.AllowAnyOrigin()
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });

            var app = builder.Build();

            // Apply CORS policy
            app.UseCors("AllowAll");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}