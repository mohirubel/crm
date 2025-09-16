using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Common.Models
{
    [Table("aspnet_Applications", Schema = "security")]
    public class Application
    {
        public string ApplicationName { get; set; }
        public string LoweredApplicationName { get; set; }
        [Key]
        public Guid ApplicationId { get; set; }
        public string? Description { get; set; }
    }
}
