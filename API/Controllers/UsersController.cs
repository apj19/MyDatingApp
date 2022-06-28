using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Data;

using API.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Repository;
using API.Dtos;
using AutoMapper;

namespace API.Controllers
{
   
    public class UsersController : BaseApiController
    {
        // private readonly DataContext db;

        // public UsersController(DataContext db)
        // {
        //     this.db = db;
        // }
        //adding repository pattren
        private readonly IUserRepository userRepo;
        private readonly IMapper mapper;

        public UsersController(IUserRepository userRepo,IMapper mapper)
        {
            this.userRepo = userRepo;
            this.mapper = mapper;
        }

        
        [HttpGet]
        
        public async Task< ActionResult<IEnumerable<MemberDto>>> GetUsers(){
            //return await db.Users.ToListAsync();
            //return Ok(await userRepo.GetUsersAsync());
            var users= await userRepo.GetMembersAsync();
            //var usertoReturn=mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(users);
        }
        
        
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username){
            //return await db.Users.FindAsync(id);
            //return await userRepo.GetUserByIdAsync(id);
            //return await userRepo.GetUserByUsernameAsync(username);

            //var user=await userRepo.GetUserByUsernameAsync(username);

            //return mapper.Map<MemberDto>(user);
            //return Ok(user);

            return await userRepo.GetMemberAsync(username);
        }
    }
}