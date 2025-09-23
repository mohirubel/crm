using CRM.Common.Models;
using CRM.Data.Repositories;
using CRM.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Service.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }


        #region Account Type
       
        public async Task<IEnumerable<AccountType>> GetAllAccountTypeAsync()
        {
            return await _accountRepository.GetAllAccountTypeAsync();
        }

        public async Task<AccountType> GetAccountTypeByIdAsync(int id)
        {
            return await _accountRepository.GetAccountTypeByIdAsync(id);
        }

        public async Task<int> AddAccountTypeAsync(AccountType entity)
        {
            return await _accountRepository.AddAccountTypeAsync(entity);
        }

        public async Task<int> UpdateAccountTypeAsync(AccountType entity)
        {
            return await _accountRepository.UpdateAccountTypeAsync(entity);
        }

        public async Task<int> DeleteAccountTypeAsync(int id)
        {
            return await _accountRepository.DeleteAccountTypeAsync(id);
        }

        public async Task<bool> TypeNameExistsAsync(string typeName, int? excludeId = null)
        {
            return await _accountRepository.TypeNameExistsAsync(typeName, excludeId);
        }


        #endregion

        #region AccountHead

        public async Task<IEnumerable<AccountHead>> GetAllAccountHeadAsync()
        {
            return await _accountRepository.GetAllAccountHeadAsync();
        }

        public async Task<AccountHead> GetAccountHeadByIdAsync(int id)
        {
            return await _accountRepository.GetAccountHeadByIdAsync(id);
        }

        public async Task<int> AddAccountHeadAsync(AccountHead entity)
        {
            return await _accountRepository.AddAccountHeadAsync(entity);
        }

        public async Task<int> UpdateAccountHeadAsync(AccountHead entity)
        {
            return await _accountRepository.UpdateAccountHeadAsync(entity);
        }

        public async Task<int> DeleteAccountHeadAsync(int id)
        {
            return await _accountRepository.DeleteAccountTypeAsync(id);
        }

        #endregion

        #region Account
        //Task<IEnumerable<Account>> GetAllAccountAsync();
        //Task<Account> GetAccountByIdAsync(int id);
        //Task<int> AddAccountAsync(Account entity);
        //Task<int> UpdateAccountAsync(Account entity);
        //Task<int> DeleteAccountAsync(int id);

        public async Task<IEnumerable<Account>> GetAllAccountAsync()
        {
            return await _accountRepository.GetAllAccountAsync();
        }

        public async Task<Account> GetAccountByIdAsync(int id)
        {
            return await _accountRepository.GetAccountByIdAsync(id);
        }

        public async Task<int> AddAccountAsync(Account entity)
        {
            return await _accountRepository.AddAccountAsync(entity);
        }

        public async Task<int> UpdateAccountAsync(Account entity)
        {
            return await _accountRepository.UpdateAccountAsync(entity);
        }

        public async Task<int> DeleteAccountAsync(int id)
        {
            return await _accountRepository.DeleteAccountAsync(id);
        }

        #endregion
    }
}
