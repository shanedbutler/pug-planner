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
                               g.MaxPlayers, g.Recurring,
                               g.PrimaryHostId, g.SecondaryHostId,
                               up.Id, up.FirstName, up.LastName, 
                               up.Email, up.Phone, up.Club,
                               up.CreateDateTime, up.[Admin], up.PronounId,
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone, up.Active,
                               p.[Name] as PrimaryPositionName, p2.[Name] as SecondaryPositionName,
                               p.FullName as PrimaryPositionFullName, p2.FullName as SecondaryPositionFullName,
                               pn.[Name] as PronounName,
                               up2.Id as Id2, up2.FirstName as FirstName2, up2.LastName as LastName2, 
                               up2.Email as Email2, up2.Phone as Phone2, up2.Club as Club2,
                               up2.CreateDateTime as CreateDateTime2, up2.[Admin] as Admin2, up2.PronounId as PronounId2,
                               up2.PrimaryPositionId as PrimaryPositionId2, up2.SecondaryPositionId as SecondaryPositionId2,
                               up2.EmergencyName as EmergencyName2, up2.EmergencyPhone as EmergencyPhone2, up2.Active as Active2,
                               p3.[Name] as PrimaryPositionName2, p4.[Name] as SecondaryPositionName2,
                               p3.FullName as PrimaryPositionFullName2, p4.FullName as SecondaryPositionFullName2,
                               pn2.[Name] as PronounName2
                        FROM Game g
                               LEFT JOIN UserProfile up ON g.PrimaryHostId = up.Id
                               LEFT JOIN UserProfile up2 ON g.SecondaryHostId = up2.Id
                               JOIN [Position] p ON up.PrimaryPositionId = p.Id
                               LEFT JOIN [Position] p2 ON up.SecondaryPositionId = p2.Id
                               JOIN Pronoun pn ON up.PronounId = pn.Id
                               LEFT JOIN [Position] p3 ON up2.PrimaryPositionId = p3.Id
                               LEFT JOIN [Position] p4 ON up2.SecondaryPositionId = p4.Id
                               LEFT JOIN Pronoun pn2 ON up2.PronounId = pn2.Id
                        ORDER BY g.GameDate ASC";

                    List<Game> games = new();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Game game = NewGameFromReader(reader);

                        if (game.SecondaryHostId != null)
                        {
                            game = AddSecondHostFromReader(game, reader);
                        }
                        games.Add(game);
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
                               g.MaxPlayers, g.Recurring,
                               g.PrimaryHostId, g.SecondaryHostId,
                               up.Id, up.FirstName, up.LastName, 
                               up.Email, up.Phone, up.Club,
                               up.CreateDateTime, up.[Admin], up.PronounId,
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone, up.Active,
                               p.[Name] as PrimaryPositionName, p2.[Name] as SecondaryPositionName,
                               p.FullName as PrimaryPositionFullName, p2.FullName as SecondaryPositionFullName,
                               pn.[Name] as PronounName,
                               up2.Id as Id2, up2.FirstName as FirstName2, up2.LastName as LastName2, 
                               up2.Email as Email2, up2.Phone as Phone2, up2.Club as Club2,
                               up2.CreateDateTime as CreateDateTime2, up2.[Admin] as Admin2, up2.PronounId as PronounId2,
                               up2.PrimaryPositionId as PrimaryPositionId2, up2.SecondaryPositionId as SecondaryPositionId2,
                               up2.EmergencyName as EmergencyName2, up2.EmergencyPhone as EmergencyPhone2, up2.Active as Active2,
                               p3.[Name] as PrimaryPositionName2, p4.[Name] as SecondaryPositionName2,
                               p3.FullName as PrimaryPositionFullName2, p4.FullName as SecondaryPositionFullName2,
                               pn2.[Name] as PronounName2
                        FROM Game g
                               LEFT JOIN UserProfile up ON g.PrimaryHostId = up.Id
                               LEFT JOIN UserProfile up2 ON g.SecondaryHostId = up2.Id
                               JOIN [Position] p ON up.PrimaryPositionId = p.Id
                               LEFT JOIN [Position] p2 ON up.SecondaryPositionId = p2.Id
                               JOIN Pronoun pn ON up.PronounId = pn.Id
                               LEFT JOIN [Position] p3 ON up2.PrimaryPositionId = p3.Id
                               LEFT JOIN [Position] p4 ON up2.SecondaryPositionId = p4.Id
                               LEFT JOIN Pronoun pn2 ON up2.PronounId = pn2.Id
                        WHERE g.id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();

                    Game game = null;

                    if (reader.Read())
                    {
                        game = NewGameFromReader(reader);

                        if (game.SecondaryHostId != null)
                        {
                            game = AddSecondHostFromReader(game, reader);
                        }
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
                Recurring = DbUtils.GetBool(reader, "Recurring"),
                PrimaryHostId = DbUtils.GetInt(reader, "PrimaryHostId"),
                SecondaryHostId = DbUtils.GetNullableInt(reader, "SecondaryHostId"),
                PrimaryHost = new User()
                {
                    Id = DbUtils.GetInt(reader, "PrimaryHostId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    Phone = DbUtils.GetString(reader, "Phone"),
                    Club = DbUtils.GetString(reader, "Club"),
                    PrimaryPositionId = DbUtils.GetInt(reader, "PrimaryPositionId"),
                    SecondaryPositionId = DbUtils.GetInt(reader, "SecondaryPositionId"),
                    PronounId = DbUtils.GetInt(reader, "PronounId"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    Admin = DbUtils.GetBool(reader, "Admin"),
                    EmergencyName = DbUtils.GetString(reader, "EmergencyName"),
                    EmergencyPhone = DbUtils.GetString(reader, "EmergencyPhone"),
                    Active = DbUtils.GetBool(reader, "Active"),
                    Position = new UserPosition()
                    {
                        Primary = DbUtils.GetString(reader, "PrimaryPositionName"),
                        Secondary = DbUtils.GetString(reader, "SecondaryPositionName"),
                        PrimaryFull = DbUtils.GetString(reader, "PrimaryPositionFullName"),
                        SecondaryFull = DbUtils.GetString(reader, "SecondaryPositionFullName"),
                    },
                    Pronoun = new Pronoun()
                    {
                        Id = DbUtils.GetInt(reader, "PronounId"),
                        Name = DbUtils.GetString(reader, "PronounName"),
                    }
                }
            };
        }

        private Game AddSecondHostFromReader(Game game, SqlDataReader reader)
        {
            game.SecondaryHost = new User()
            {
                Id = DbUtils.GetInt(reader, "SecondaryHostId"),
                FirstName = DbUtils.GetString(reader, "FirstName2"),
                LastName = DbUtils.GetString(reader, "LastName2"),
                Email = DbUtils.GetString(reader, "Email2"),
                Phone = DbUtils.GetString(reader, "Phone2"),
                Club = DbUtils.GetString(reader, "Club2"),
                PrimaryPositionId = DbUtils.GetInt(reader, "PrimaryPositionId2"),
                SecondaryPositionId = DbUtils.GetInt(reader, "SecondaryPositionId2"),
                PronounId = DbUtils.GetInt(reader, "PronounId2"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime2"),
                Admin = DbUtils.GetBool(reader, "Admin2"),
                EmergencyName = DbUtils.GetString(reader, "EmergencyName2"),
                EmergencyPhone = DbUtils.GetString(reader, "EmergencyPhone2"),
                Active = DbUtils.GetBool(reader, "Active2"),
                Position = new UserPosition()
                {
                    Primary = DbUtils.GetString(reader, "PrimaryPositionName2"),
                    Secondary = DbUtils.GetString(reader, "SecondaryPositionName2"),
                    PrimaryFull = DbUtils.GetString(reader, "PrimaryPositionFullName2"),
                    SecondaryFull = DbUtils.GetString(reader, "SecondaryPositionFullName2"),
                },
                Pronoun = new Pronoun()
                {
                    Id = DbUtils.GetInt(reader, "PronounId2"),
                    Name = DbUtils.GetString(reader, "PronounName2"),
                }
            };

            return game;
        }

        public void Add(Game game)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        INSERT INTO Game (Title, Location, Address, Description,
                                          GameDate, SignupDate, MaxPlayers, Recurring, PrimaryHostId, SecondaryHostId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Location, @Address, @Description,
                                @GameDate, @SignupDate, @MaxPlayers, @Recurring, @PrimaryHostId, @SecondaryHostId)";

                        DbUtils.AddParameter(cmd, "@Title", game.Title);
                        DbUtils.AddParameter(cmd, "@Location", game.Location);
                        DbUtils.AddParameter(cmd, "@Address", game.Address);
                        DbUtils.AddParameter(cmd, "@Description", game.Description);
                        DbUtils.AddParameter(cmd, "@GameDate", game.GameDate);
                        DbUtils.AddParameter(cmd, "@SignupDate", game.SignupDate);
                        DbUtils.AddParameter(cmd, "@MaxPlayers", game.MaxPlayers);
                        DbUtils.AddParameter(cmd, "@Recurring", game.Recurring);
                        DbUtils.AddParameter(cmd, "@PrimaryHostId", game.PrimaryHostId);
                        DbUtils.AddParameter(cmd, "@SecondaryHostId", game.SecondaryHostId);

                        game.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }

            public void Update(Game game)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        UPDATE Game
                            SET
                                Title = @Title,
                                Location = @Location,
                                Address = @Address,
                                Description = @Description,
                                GameDate = @GameDate,
                                SignupDate = @SignupDate,
                                MaxPlayers = @MaxPlayers,
                                Recurring = @Recurring,
                                PrimaryHostId = @PrimaryHostId,
                                SecondaryHostId = @SecondaryHostId
                            WHERE Id = @Id";

                        DbUtils.AddParameter(cmd, "@Id", game.Id);
                        DbUtils.AddParameter(cmd, "@Title", game.Title);
                        DbUtils.AddParameter(cmd, "@Location", game.Location);
                        DbUtils.AddParameter(cmd, "@Address", game.Address);
                        DbUtils.AddParameter(cmd, "@Description", game.Description);
                        DbUtils.AddParameter(cmd, "@GameDate", game.GameDate);
                        DbUtils.AddParameter(cmd, "@SignupDate", game.SignupDate);
                        DbUtils.AddParameter(cmd, "@MaxPlayers", game.MaxPlayers);
                        DbUtils.AddParameter(cmd, "@Recurring", game.Recurring);
                        DbUtils.AddParameter(cmd, "@PrimaryHostId", game.PrimaryHostId);
                        DbUtils.AddParameter(cmd, "@SecondaryHostId", game.SecondaryHostId);

                        cmd.ExecuteNonQuery();
                    }
                }
            }

        }
    }
