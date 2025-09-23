using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{

    public class TransactionDetail
    {
        public long DetailID { get; set; }
        public long TransactionID { get; set; }
        public int AccountID { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }

        //public Transaction Transaction { get; set; }
        //public Account Account { get; set; }
    }
}
