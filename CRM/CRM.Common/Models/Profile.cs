using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{
    [Table("aspnet_Profile", Schema = "security")]
    public class Profile
    {
        [Key]
        public Guid UserId { get; set; }
        public string PropertyNames { get; set; }
        public string PropertyValuesString { get; set; }
        public byte[] PropertyValuesBinary { get; set; }
        public DateTime LastUpdatedDate { get; set; }
    }
}
