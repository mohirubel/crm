using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CRM.Data.Repositories
{

    public class DapperRepository<T> : IGenericRepository where T : class
    {
        private readonly string _connectionString;
        private readonly string _tableName;
        private readonly string _keyName;

        public DapperRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _tableName = typeof(T).Name;              // Example: Account, AccountHead
            _keyName = _tableName + "ID";             // Convention based PK
        }

        private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            using var conn = CreateConnection();
            return await conn.QueryAsync<T>($"SELECT * FROM [Account].[{_tableName}] WHERE IsDeleted = 0");
        }

        public async Task<T> GetByIdAsync(object id)
        {
            using var conn = CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<T>(
                $"SELECT * FROM [Account].[{_tableName}] WHERE {_keyName} = @id AND IsDeleted = 0", new { id });
        }

        public async Task<int> AddAsync(T entity)
        {
            using var conn = CreateConnection();
            // Insert: Dynamic build by Dapper.Contrib OR Manual Insert
            var sql = GenerateInsertQuery();
            return await conn.ExecuteAsync(sql, entity);
        }

        public async Task<int> UpdateAsync(T entity)
        {
            using var conn = CreateConnection();
            var sql = GenerateUpdateQuery();
            return await conn.ExecuteAsync(sql, entity);
        }

        public async Task<int> DeleteAsync(object id)
        {
            using var conn = CreateConnection();
            // Soft Delete
            var sql = $"UPDATE [Account].[{_tableName}] SET IsDeleted = 1 WHERE {_keyName} = @id";
            return await conn.ExecuteAsync(sql, new { id });
        }

        // -------- Helper methods ----------
        private string GenerateInsertQuery()
        {
            var props = typeof(T).GetProperties()
                .Where(p => p.Name != _keyName) // Exclude PK
                .Select(p => p.Name);

            var columns = string.Join(", ", props);
            var values = string.Join(", ", props.Select(p => "@" + p));

            return $"INSERT INTO [Account].[{_tableName}] ({columns}) VALUES ({values})";
        }

        private string GenerateUpdateQuery()
        {
            var props = typeof(T).GetProperties()
                .Where(p => p.Name != _keyName) // Exclude PK
                .Select(p => $"{p.Name} = @{p.Name}");

            var setClause = string.Join(", ", props);

            return $"UPDATE [Account].[{_tableName}] SET {setClause} WHERE {_keyName} = @{_keyName}";
        }
    }
}
