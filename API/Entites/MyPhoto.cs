using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entites
{
    public class MyPhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }

        public bool IsMain{ get; set; }

        public string PublicId { get; set; }

    }
}