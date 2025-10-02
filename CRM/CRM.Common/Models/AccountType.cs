using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{
    [Table("AccountTypes", Schema = "Account")]
    public class AccountType
    {
        [Key]
        public int AccountTypeID { get; set; }
        public string TypeName { get; set; }
        public string NormalBalance { get; set; }
        public string Description { get; set; }

       // public ICollection<AccountHead> AccountHeads { get; set; }
    }
}
