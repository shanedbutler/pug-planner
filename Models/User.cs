using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;

namespace PUGPlanner_FS.Models
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

        public bool Active { get; set; }

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
                return $"{FirstName} at {PhoneString}";
            }
        }

        public string JoinYear => CreateDateTime.ToString("yyyy");

        private string FormatPhone (string phone)
        {
            var areaCodeValues = phone.Take(3);
            var middleThreeValues = phone.Skip(3).Take(3);
            var lastFourValues = phone.Skip(5).Take(4);

            string areaCode = string.Join("", areaCodeValues);
            string middleThree = string.Join("", middleThreeValues);
            string lastFour = string.Join("", lastFourValues);


            return $"({areaCode}) {middleThree}-{lastFour}";
        }

        public string PhoneString => FormatPhone(Phone);
        public string EmergencyPhoneString => FormatPhone(EmergencyPhone);

    }
}
