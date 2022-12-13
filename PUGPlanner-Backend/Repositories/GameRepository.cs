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
                               g.MaxPlayers, g.UserProfileId,
                               up.Id, up.FirstName, up.LastName, 
                               up.Email, up.CreateDateTime, up.[Admin],
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone,
                               p.[Name] as PrimaryPositionName,
                               p2.[Name] as SecondaryPositionName
                        FROM Game g
                            LEFT JOIN UserProfile up ON g.UserProfileId = up.Id
                            JOIN [Position] p ON up.PrimaryPositionId = p.id
                            JOIN [Position] p2 ON up.SecondaryPositionId = p2.id";

                    List<Game> games = new();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read()) 
                    {
                        games.Add(NewGameFromReader(reader));
                    }

                    return games;
                }
            }
        }


        public Game Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id, g.Title, g.Location, g.Address,
                               g.Description, g.GameDate, g.SignupDate,
                               g.MaxPlayers, g.UserProfileId,
                               up.Id, up.FirstName, up.LastName, 
                               up.Email, up.CreateDateTime, up.[Admin],
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone,
                               p.[Name] as PrimaryPositionName,
                               p2.[Name] as SecondaryPositionName
                        FROM Game g
                            LEFT JOIN UserProfile up ON g.UserProfileId = up.Id
                            JOIN [Position] p ON up.PrimaryPositionId = p.id
                            JOIN [Position] p2 ON up.SecondaryPositionId = p2.id
                        WHERE g.id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();

                    Game game = null;

                    if (reader.Read())
                    {
                        game = NewGameFromReader(reader);
                    }
                    reader.Close();

                    return game;
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
                AdminUser = new User()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    PrimaryPositionId = DbUtils.GetInt(reader, "PrimaryPositionId"),
                    SecondaryPositionId = DbUtils.GetInt(reader, "SecondaryPositionId"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    Admin = reader.GetBoolean(reader.GetOrdinal("Admin")),
                    EmergencyName = DbUtils.GetString(reader, "EmergencyName"),
                    EmergencyPhone = DbUtils.GetString(reader, "EmergencyPhone"),
                    Position = new UserPosition()
                    {
                        Primary = DbUtils.GetString(reader, "PrimaryPositionName"),
                        Secondary = DbUtils.GetString(reader, "SecondaryPositionName"),
                    }
                }
            };
        }

    }
}
