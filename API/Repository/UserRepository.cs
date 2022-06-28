using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entites;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IMapper mapper;

        public DataContext db { get; }
        public UserRepository(DataContext db,IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await db.Users
            .FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await db.Users
           .Include(p=>p.Photos)
            .FirstOrDefaultAsync(x => x.UserName==username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await db.Users
            .Include(p=>p.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await db.SaveChangesAsync()>0;
        }

        public void update(AppUser user)
        {
            db.Entry(user).State=EntityState.Modified;
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await db.Users
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .ToListAsync();
        }


        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await db.Users
            .Where(x=>x.UserName==username)
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .SingleAsync();
        }
    }
}