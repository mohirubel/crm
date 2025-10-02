using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{
    [Table("Contacts", Schema = "security")] // টেবিলের নাম যদি Contacts হয়
    public class Contact
    {
        [Key]
        public Guid ContactId { get; set; }
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(255)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(255)]
        public string UserName { get; set; }

        [MaxLength(255)]
        public string? Phone { get; set; }

        [MaxLength(255)]
        public string? Email { get; set; }
        public DateTime CreateDate { get; set; }

        [NotMapped]
        public string Password { get; set; }
        [NotMapped]
        public string RoleName { get; set; }
    }
}
