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
        [MaxLength(50)]
        public string Location { get; set; }

        [Required]
        [MaxLength(255)]
        public string Address { get; set; }

        [Required]
        [MaxLength(1500)]
        public string Description { get; set; }

        [Required]
        public DateTime GameDate { get; set; }

        [Required]
        public DateTime SignupDate { get; set; }

        [Required]
        public int MaxPlayers { get; set; }

        [Required]
        public bool Recurring { get; set; }

        [Required]
        public int PrimaryHostId { get; set; }

        public int SecondaryHostId { get; set; }

        public string GameDateString => GameDate.ToString("dddd, dd MMMM yyyy @ hh:mm tt");
        public string SignupDateString => SignupDate.ToString("dddd, dd MMMM yyyy @ hh:mm tt");
        public int SignupDateStatus => SignupDate.CompareTo(DateTime.Now);
        public int GameDateStatus => GameDate.CompareTo(DateTime.Now);
        public string GameDateFormString => GameDate.ToString("yyyy-MM-dd");
        public string GameTimeFormString => GameDate.ToString("HH:mm");
        public string SignupDateFormString => SignupDate.ToString("yyyy-MM-dd");
        public string SignupTimeFormString => SignupDate.ToString("HH:mm");
            
        public User PrimaryHost { get; set; }
        public User SecondaryHost { get; set; }

    }
}
