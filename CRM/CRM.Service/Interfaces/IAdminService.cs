﻿using Azure.Core;
using CRM.Common.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Service.Interfaces
{
    public interface IAdminService
    {
        Task<Guid> RegisterAsyncMembership(User model, string roleName, string email);
        Task<IdentityResult> RegisterAsync(User model);
        Task<SignInResult> LoginAsync(string userName, string password);
        Task LogoutAsync();
        Task<Membership> GetUserByIdAsync(Guid userId);
        Task<IdentityResult> UpdateUserAsync(Membership model);
        Task<IdentityResult> DeleteUserAsync(Guid userId);
        Task<Guid> CreateUserAsync(User user, string roleName, string email);
        Task<bool> UpdateUserNameAsync(User user);
        Task<bool> CheckUserNameExistAsync(User user);
        Task<(bool IsSuccess, Guid UserId, string RoleName, string UserName)> ValidateUser(string userName, string password);

        Task<List<UsersInRole>> GetUserInRolesByUserId(Guid id);
        Task<Guid> CreateContactAsync(Contact contact);

    }

}
