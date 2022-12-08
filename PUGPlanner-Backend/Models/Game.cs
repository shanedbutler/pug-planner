﻿using System.ComponentModel.DataAnnotations;

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
        [MaxLength(255)]
        public string Description { get; set; }

        [Required]
        public DateTime GameDate { get; set; }

        [Required]
        public DateTime SignupDate { get; set; }

        [Required]
        public int MaxPlayers { get; set; }
        public string GameDateString => GameDate.ToString("dddd, dd MMMM yyyy");
        public string SignupDateString => SignupDate.ToString("dddd, dd MMMM yyyy");

    }
}
