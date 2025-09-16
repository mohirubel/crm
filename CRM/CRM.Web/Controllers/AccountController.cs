using CRM.Common.Models;
using CRM.Data.Repositories;
using CRM.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.Types;

namespace CRM.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly IAccountService _accountService;
        private readonly ILogger<AccountRepository> _logger;
        public AccountController(IAccountService accountService, ILogger<AccountRepository> logger)
        {
            _accountService = accountService;
            _logger = logger;
        }

        #region Account Type
        [HttpGet("types")]
        public async Task<IActionResult> GetAllType()
        {
            try
            {
                var data = await _accountService.GetAllAccountTypeAsync();
                return Ok(new { Data = data, Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching AccountTypes.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpGet("types/{id}")]
        public async Task<IActionResult> GetByTypeId(int id)
        {
            try
            {
                var item = await _accountService.GetAccountTypeByIdAsync(id);
                if (item == null)
                    return NotFound(new { Message = "Not found", Success = false });

                return Ok(new { Data = item, Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching AccountType with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpPost("types")]
        public async Task<IActionResult> CreateType([FromBody] AccountType model)
        {
            try
            {
                // Validation - NormalBalance maximum 1 character 
                if (string.IsNullOrEmpty(model.NormalBalance) || model.NormalBalance.Length != 1)
                    return BadRequest(new { Message = "NormalBalance must be exactly 1 character.", Success = false });

                // Validation - TypeName unique 
                if (await _accountService.TypeNameExistsAsync(model.TypeName))
                    return BadRequest(new { Message = "TypeName already exists.", Success = false });


                int id = await _accountService.AddAccountTypeAsync(model);
                return Ok(new { Message = "AccountType created successfully", Success = true, Id = id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating AccountType.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpPut("types/{id}")]
        public async Task<IActionResult> UpdateType(int id, [FromBody] AccountType model)
        {
            try
            {
                model.AccountTypeID = id;

                // Validation - NormalBalance maximum 1 character
                if (string.IsNullOrEmpty(model.NormalBalance) || model.NormalBalance.Length != 1)
                    return BadRequest(new { Message = "NormalBalance must be exactly 1 character.", Success = false });

                // Validation - check TypeName unique
                if (await _accountService.TypeNameExistsAsync(model.TypeName, id))
                    return BadRequest(new { Message = "TypeName already exists.", Success = false });


                int updatedId = await _accountService.UpdateAccountTypeAsync(model);
                return Ok(new { Message = "AccountType updated successfully", Success = true, Id = updatedId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating AccountType with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpDelete("types/{id}")]
        public async Task<IActionResult> DeleteType(int id)
        {
            try
            {
                await _accountService.DeleteAccountTypeAsync(id);
                return Ok(new { Message = "AccountType deleted successfully", Success = true,id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting AccountType with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        #endregion

        #region Account Head
        [HttpGet("heads")]
        public async Task<IActionResult> GetAllHead()
        {
            try
            {
                var data = await _accountService.GetAllAccountHeadAsync();
                return Ok(new { Data = data, Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching AccountHeads.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpGet("heads/{id}")]
        public async Task<IActionResult> GetByHeadId(int id)
        {
            try
            {
                var item = await _accountService.GetAccountHeadByIdAsync(id);
                if (item == null)
                    return NotFound(new { Message = "Not found", Success = false });

                return Ok(new { Data = item, Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching AccountHead with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpPost("heads")]
        public async Task<IActionResult> CreateHead([FromBody] AccountHead model)
        {
            try
            {
                model.CreatedDate = DateTime.Now;
                model.IsActive = true;
                model.IsDeleted = false;
                await _accountService.AddAccountHeadAsync(model);

                return Ok(new { Message = "AccountHead created successfully", Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating AccountHead.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpPut("heads/{id}")]
        public async Task<IActionResult> UpdateHead(int id, [FromBody] AccountHead model)
        {
            try
            {
                model.HeadID = id;
                model.UpdatedDate = DateTime.Now;
                await _accountService.UpdateAccountHeadAsync(model);

                return Ok(new { Message = "AccountHead updated successfully", Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating AccountHead with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpDelete("heads/{id}")]
        public async Task<IActionResult> DeleteHead(int id)
        {
            try
            {
                await _accountService.DeleteAccountHeadAsync(id);
                return Ok(new { Message = "AccountHead deleted successfully", Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting AccountHead with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }
        #endregion

        #region Account

        [HttpGet("accounts")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var data = await _accountService.GetAllAccountAsync();
                return Ok(new { Data = data, Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching Accounts.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpGet("accounts/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var item = await _accountService.GetAccountByIdAsync(id);
                if (item == null)
                    return NotFound(new { Message = "Not found", Success = false });

                return Ok(new { Data = item, Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching Account with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpPost("accounts")]
        public async Task<IActionResult> Create([FromBody] Account model)
        {
            try
            {
                model.CreatedDate = DateTime.Now;
                model.IsActive = true;
                model.IsDeleted = false;
                await _accountService.AddAccountAsync(model);

                return Ok(new { Message = "Account created successfully", Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Account.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpPut("accounts/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Account model)
        {
            try
            {
                model.AccountID = id;
                model.UpdatedDate = DateTime.Now;
                await _accountService.UpdateAccountAsync(model);

                return Ok(new { Message = "Account updated successfully", Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating Account with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        [HttpDelete("accounts/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _accountService.DeleteAccountAsync(id);
                return Ok(new { Message = "Account deleted successfully", Success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting Account with ID {id}.");
                return StatusCode(500, new { Message = ex.Message, Success = false });
            }
        }

        #endregion

    }
}

