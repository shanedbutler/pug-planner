using Microsoft.Data.SqlClient;
using PUGPlanner_Backend.Models;
using PUGPlanner_Backend.Utils;

namespace PUGPlanner_Backend.Repositories
{
    public class GameRepository : BaseRepository, IGameRepository
    {
        public GameRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Get all games from the database
        /// </summary>
        /// <returns>List collection of game objects</returns>
        public List<Game> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id, g.Title, g.Location, g.Address,
                               g.Description, g.GameDate, g.SignupDate,
                               g.MaxPlayers, g.UserProfileId
                        FROM Game g";

                    List<Game> games = new List<Game>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read()) 
                    {
                        games.Add(NewGameFromReader(reader));
                    }
                    reader.Close();

                    return games;
                }
            }
        }

        /// <summary>
        /// Instantiates a new Game object through the SQL Data Reader
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>Game object</returns>
        private Game NewGameFromReader(SqlDataReader reader)
        {
            return new Game()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Location = DbUtils.GetString(reader, "Location"),
                Address = DbUtils.GetString(reader, "Address"),
                Description = DbUtils.GetString(reader, "Description"),
                GameDate = DbUtils.GetDateTime(reader, "GameDate"),
                SignupDate = DbUtils.GetDateTime(reader, "SignupDate"),
                MaxPlayers = DbUtils.GetInt(reader, "MaxPlayers"),
            };
        }

    }
}
