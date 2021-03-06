using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Entites;

namespace API.Repository
{
    public interface IUserRepository
    {
        void update(AppUser user);

        Task<bool>SaveAllAsync();

        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser>GetUserByIdAsync(int id);

        Task<AppUser>GetUserByUsernameAsync(string username);

        Task<IEnumerable<MemberDto>> GetMembersAsync();

        Task<MemberDto> GetMemberAsync(string username);
    }
}