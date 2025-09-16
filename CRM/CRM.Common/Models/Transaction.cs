using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{
    public class Transaction
    {
        public long TransactionID { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Description { get; set; }
        public string ReferenceNumber { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        //public ICollection<TransactionDetail> TransactionDetails { get; set; }
    }

}
