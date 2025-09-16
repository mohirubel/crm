using CRM.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Data.Repositories
{
    public interface IAccountRepository
    {
        #region Account Type
        Task<IEnumerable<AccountType>> GetAllAccountTypeAsync();
        Task<AccountType> GetAccountTypeByIdAsync(int id);
        Task<int> AddAccountTypeAsync(AccountType entity);
        Task<int> UpdateAccountTypeAsync(AccountType entity);
        Task<int> DeleteAccountTypeAsync(int id);
        Task<bool> TypeNameExistsAsync(string typeName, int? excludeId);
        #endregion

        #region AccountHead
        Task<IEnumerable<AccountHead>> GetAllAccountHeadAsync();
        Task<AccountHead> GetAccountHeadByIdAsync(int id);
        Task<int> AddAccountHeadAsync(AccountHead entity);
        Task<int> UpdateAccountHeadAsync(AccountHead entity);
        Task<int> DeleteAccountHeadAsync(int id);

        #endregion

        #region Account
        Task<IEnumerable<Account>> GetAllAccountAsync();
        Task<Account> GetAccountByIdAsync(int id);
        Task<int> AddAccountAsync(Account entity);
        Task<int> UpdateAccountAsync(Account entity);
        Task<int> DeleteAccountAsync(int id);

        #endregion
    }
}
