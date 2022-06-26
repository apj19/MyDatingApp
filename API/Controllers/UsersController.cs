using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Data;

using API.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    
    public class UsersController : BaseApiController
    {
        private readonly DataContext db;

        public UsersController(DataContext db)
        {
            this.db = db;
        }

        
        [HttpGet]
        [AllowAnonymous]
        public async Task< ActionResult<IEnumerable<AppUser>>> GetUsers(){
            return await db.Users.ToListAsync();
        }
        
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id){
            return await db.Users.FindAsync(id);
        }
    }
}