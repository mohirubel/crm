using CRM.Common.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CRM.Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AccountRepository> _logger;

        public AccountRepository(IConfiguration configuration, ILogger<AccountRepository> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }
        private SqlConnection CreateConnection()
        {
            return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }


        #region Account Type
        public async Task<IEnumerable<AccountType>> GetAllAccountTypeAsync()
        {
            var sql = "SELECT * FROM [Account].[AccountTypes]";
            using var connection = CreateConnection();
            return await connection.QueryAsync<AccountType>(sql);
        }

        public async Task<AccountType> GetAccountTypeByIdAsync(int id)
        {
            var sql = "SELECT * FROM [Account].[AccountTypes] WHERE AccountTypeID = @Id";
            using var connection = CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<AccountType>(sql, new { Id = id });
        }

        public async Task<int> AddAccountTypeAsync(AccountType entity)
        {
            var sql = @"
                        INSERT INTO [Account].[AccountTypes] (TypeName, NormalBalance, Description)
                        OUTPUT INSERTED.AccountTypeID
                        VALUES (@TypeName, @NormalBalance, @Description)";

            using var connection = CreateConnection();
            return await connection.ExecuteScalarAsync<int>(sql, entity);
        }

        public async Task<int> UpdateAccountTypeAsync(AccountType entity)
        {
            var sql = @"
                    UPDATE [Account].[AccountTypes]
                    SET TypeName = @TypeName, NormalBalance = @NormalBalance, Description = @Description
                    WHERE AccountTypeID = @AccountTypeID";

            using var connection = CreateConnection();
            await connection.ExecuteAsync(sql, entity);
            return entity.AccountTypeID;
        }

        public async Task<int> DeleteAccountTypeAsync(int id)
        {
            var sql = "DELETE FROM [Account].[AccountTypes] WHERE AccountTypeID = @Id";
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, new { Id = id });
        }


        public async Task<bool> TypeNameExistsAsync(string typeName, int? excludeId = null)
        {
            var sql = @"SELECT COUNT(1) 
                FROM [Account].[AccountTypes] 
                WHERE TypeName = @TypeName";

            if (excludeId.HasValue)
                sql += " AND AccountTypeID <> @ExcludeId";

            using var connection = CreateConnection();
            var count = await connection.ExecuteScalarAsync<int>(sql, new { TypeName = typeName, ExcludeId = excludeId });
            return count > 0;
        }

        #endregion

        #region Account Head
        public async Task<IEnumerable<AccountHead>> GetAllAccountHeadAsync()
        {
            var sql = @"SELECT * 
                FROM [Account].[AccountHeads] 
                WHERE IsDeleted = 0 AND IsActive = 1";
            using var connection = CreateConnection();
            return await connection.QueryAsync<AccountHead>(sql);
        }

        public async Task<AccountHead> GetAccountHeadByIdAsync(int id)
        {
            var sql = @"SELECT * 
                FROM [Account].[AccountHeads] 
                WHERE HeadID = @Id AND IsDeleted = 0 AND IsActive = 1";
            using var connection = CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<AccountHead>(sql, new { Id = id });
        }

        public async Task<int> AddAccountHeadAsync(AccountHead entity)
        {
            var sql = @"INSERT INTO [Account].[AccountHeads] 
                        (HeadName, Description, CreatedDate, CreatedBy, IsActive, IsDeleted, AccountTypeID)
                        VALUES (@HeadName, @Description, @CreatedDate, @CreatedBy, @IsActive, @IsDeleted, @AccountTypeID)";
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, entity);
        }

        public async Task<int> UpdateAccountHeadAsync(AccountHead entity)
        {
            var sql = @"UPDATE [Account].[AccountHeads]
                        SET HeadName = @HeadName, Description = @Description, 
                            UpdatedDate = @UpdatedDate, UpdatedBy = @UpdatedBy, 
                            IsActive = @IsActive, IsDeleted = @IsDeleted, 
                            AccountTypeID = @AccountTypeID
                        WHERE HeadID = @HeadID";
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, entity);
        }

        public async Task<int> DeleteAccountHeadAsync(int id)
        {
            var sql = @"UPDATE [Account].[AccountHeads] 
                SET IsDeleted = 1 
                WHERE HeadID = @Id";
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, new { Id = id });
        }
        #endregion

        #region Account
        public async Task<IEnumerable<Account>> GetAllAccountAsync()
        {
            var sql = "SELECT * FROM [Account].[Accounts]";
            using var connection = CreateConnection();
            return await connection.QueryAsync<Account>(sql);
        }

        public async Task<Account> GetAccountByIdAsync(int id)
        {
            var sql = "SELECT * FROM [Account].[Accounts] WHERE AccountID = @Id";
            using var connection = CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<Account>(sql, new { Id = id });
        }

        public async Task<int> AddAccountAsync(Account entity)
        {
            var sql = @"INSERT INTO [Account].[Accounts] 
                        (HeadID, AccountName, AccountCode, Description, CreatedDate, CreatedBy, IsActive, IsDeleted)
                        VALUES (@HeadID, @AccountName, @AccountCode, @Description, @CreatedDate, @CreatedBy, @IsActive, @IsDeleted)";
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, entity);
        }

        public async Task<int> UpdateAccountAsync(Account entity)
        {
            var sql = @"UPDATE [Account].[Accounts]
                        SET HeadID = @HeadID, AccountName = @AccountName, AccountCode = @AccountCode, Description = @Description, 
                            UpdatedDate = @UpdatedDate, UpdatedBy = @UpdatedBy, IsActive = @IsActive, IsDeleted = @IsDeleted
                        WHERE AccountID = @AccountID";
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, entity);
        }

        public async Task<int> DeleteAccountAsync(int id)
        {
            var sql = "DELETE FROM [Account].[Accounts] WHERE AccountID = @Id";
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, new { Id = id });
        }

        #endregion

    }
}
