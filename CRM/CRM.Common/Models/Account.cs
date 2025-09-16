using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{
    public class Account
    {
        public int AccountID { get; set; }
        public int HeadID { get; set; }
        public string AccountName { get; set; }
        public string AccountCode { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        //public AccountHead AccountHead { get; set; }
        //public ICollection<TransactionDetail> TransactionDetails { get; set; }
    }

}


 