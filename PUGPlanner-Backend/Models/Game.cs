using System.ComponentModel.DataAnnotations;

namespace PUGPlanner_Backend.Models
{
    public class Game
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        [Required]
        [MaxLength(255)]
        public string Address { get; set; }

        [Required]
        public DateTime GameDate { get; set; }

        [Required]
        public DateTime SignupDate { get; set; }

        [Required]
        public int PlayerCount { get; set; }
    }
}
