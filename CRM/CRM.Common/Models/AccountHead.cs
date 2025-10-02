using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{
    [Table("AccountHeads", Schema = "Account")]
    public class AccountHead
    {
        [Key]
        public int HeadID { get; set; }
        public string HeadName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public int AccountTypeID { get; set; }
        //public AccountType AccountType { get; set; }

        //public ICollection<Account> Accounts { get; set; }
    }

}
