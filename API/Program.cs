using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using API.Repository;
using API.AutoMapper;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        var connnectionString = builder.Configuration.GetConnectionString("Default");
        builder.Services.AddDbContext<DataContext>(options=>{
                options.UseSqlServer(connnectionString);
        });
        builder.Services.AddCors();
        var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])) ;
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options=>{
                options.TokenValidationParameters= new TokenValidationParameters{
                    ValidateIssuerSigningKey=true,
                ValidateIssuer=false,
                ValidateAudience=false,
                IssuerSigningKey=key,
                ClockSkew=TimeSpan.Zero
                };
            });
        //addscoped lifetime is till http request time
        builder.Services.AddScoped<ITokenService,TokenService>();
        builder.Services.AddScoped<IUserRepository,UserRepository>();
        builder.Services.AddAutoMapper(typeof(MapperProfile));
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors(policy=>policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}