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
        [MaxLength(50)]
        public string Email { get; set; }

        public DateTime CreateDateTime { get; set; }

        [Required]
        public int PrimaryPositionId { get; set; }

        [Required]
        public int SecondaryPositionId { get; set; }

        public bool Admin { get; set; }

        [Required]
        [MaxLength(50)]
        public string EmergencyName { get; set; }

        [Required]
        [MaxLength(50)]
        public string EmergencyPhone { get; set; }
        public UserPosition Position { get; set; }
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
        public string JoinYear => CreateDateTime.ToString("yyyy");

    }
}
