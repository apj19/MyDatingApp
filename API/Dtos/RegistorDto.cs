using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class RegistorDto
    {
        
        [Required]
        public string UserName { get; set; }
        [Required]
        public string password { get; set; }
        
    }
}