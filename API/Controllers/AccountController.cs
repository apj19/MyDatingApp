using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Controllers
{
    public class AccountController:BaseApiController
    {
        private readonly DataContext db;
        private readonly ITokenService tokenservice;

        public AccountController(DataContext db,ITokenService tokenservice)
        {
            this.db = db;
            this.tokenservice = tokenservice;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>>Register([FromBody]RegistorDto registorDto ){

            if(await UserExists(registorDto.UserName)){
                return BadRequest("username is exists Please try another");
            }
            
            using var hmac= new HMACSHA512();

            var user= new AppUser{
                UserName=registorDto.UserName.ToLower(),
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registorDto.password)),
                PasswordSalt=hmac.Key
            };

            db.Add(user);

            await db.SaveChangesAsync();

            //return the dto with token
            var userdto= new UserDto{
                Username=user.UserName,
                Token=tokenservice.CreateToken(user)
            };

            return userdto;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user= await db.Users.SingleOrDefaultAsync(x => x.UserName==loginDto.UserName);

            if(user==null){
                return Unauthorized("Invalid username");
            }

            using var hmac= new HMACSHA512(user.PasswordSalt);

            var computeHash= hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

            for (int i = 0; i < computeHash.Length; i++)
            {
                if(computeHash[i]!=user.PasswordHash[i]){
                    return Unauthorized("Invalid Password");
                }
            }
            var userdto= new UserDto{
                Username=user.UserName,
                Token=tokenservice.CreateToken(user)
            };

            return userdto;

            //return user;
        }

        private async Task<bool> UserExists(string username){
            return await db.Users.AnyAsync(x => x.UserName==username.ToLower());
        }


    }
}