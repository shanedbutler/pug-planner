using System.ComponentModel.DataAnnotations;

namespace PUGPlanner_Backend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime CreateDateTime { get; set; }

        [Required]
        public int PrimaryPosition { get; set; }

        [Required]
        public int SecondaryPosition { get; set; }

        public bool Admin { get; set; }
        public Position Position { get; set; }
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}
