using System.Threading.Tasks;
using API.Entities;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API.DTOS;

namespace API.Interfaces
{
    public interface IUesrRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<bool> DeleteUserByUsername(string username);
        Task<AppUser> GetUserByUsername(string username);
        Task<ActionResult<AppUser>> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(string username);

    }
}