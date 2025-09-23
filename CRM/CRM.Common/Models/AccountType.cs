using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{
    public class AccountType
    {
        public int AccountTypeID { get; set; }
        public string TypeName { get; set; }
        public string NormalBalance { get; set; }
        public string Description { get; set; }

       // public ICollection<AccountHead> AccountHeads { get; set; }
    }
}
