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

        [Required]
        [DataType(DataType.PhoneNumber)]
        [MaxLength(20)]
        public string Phone { get; set; }

        [MaxLength(50)]
        public string Club { get; set; }

        public DateTime CreateDateTime { get; set; }

        [Required]
        public int PrimaryPositionId { get; set; }

        [Required]
        public int SecondaryPositionId { get; set; }

        public bool Admin { get; set; }

        public int? PronounId { get; set; }

        [Required]
        [MaxLength(50)]
        public string EmergencyName { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        [MaxLength(20)]
        public string EmergencyPhone { get; set; }

        public Pronoun Pronoun { get; set; }

        public UserPosition Position { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        public string NameAndPhone
        {
            get
            {
                return $"{FirstName} at {Phone}";
            }
        }

        public string JoinYear => CreateDateTime.ToString("yyyy");

    }
}
