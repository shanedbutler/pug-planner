using Microsoft.Data.SqlClient;
using PUGPlanner_Backend.Models;
using PUGPlanner_Backend.Utils;

namespace PUGPlanner_Backend.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Queries the UserProfile table by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>User object</returns>
        public User Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, 
                               up.Email, up.CreateDateTime, up.[Admin],
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone,
                               p.[Name] as PrimaryPositionName,
                               p2.[Name] as SecondaryPositionName
                          FROM [UserProfile] up
                              JOIN [Position] p ON up.PrimaryPositionId = p.id
                              JOIN [Position] p2 ON up.SecondaryPositionId = p2.id
                         WHERE up.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = NewUserFromReader(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

            /// <summary>
            /// Queries the UserProfile table by email
            /// </summary>
            /// <param name="email"></param>
            /// <returns>User object</returns>
            public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, 
                               up.Email, up.CreateDateTime, up.[Admin],
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone,
                               p.[Name] as PrimaryPositionName,
                               p2.[Name] as SecondaryPositionName
                          FROM [UserProfile] up
                              JOIN [Position] p ON up.PrimaryPositionId = p.id
                              JOIN [Position] p2 ON up.SecondaryPositionId = p2.id
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = NewUserFromReader(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        /// <summary>
        /// Queries the database to get all UserProfiles that have the same Roster GameId
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns>List of User objects</returns>
        public List<User> GetByRosterGameId(int gameId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.GameId, r.UserProfileId,
                               up.Id, up.FirstName, up.LastName, 
                               up.Email, up.CreateDateTime, up.[Admin],
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone,
                               p.[Name] as PrimaryPositionName,
                               p2.[Name] as SecondaryPositionName
                        FROM GameRoster r
                            JOIN UserProfile up ON r.UserProfileId = up.Id
                            JOIN [Position] p ON up.PrimaryPositionId = p.id
                            JOIN [Position] p2 ON up.SecondaryPositionId = p2.id
                        WHERE GameId = @gameId";

                    DbUtils.AddParameter(cmd, "@gameId", gameId);

                    List<User> users = new List<User>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        User user = new User()
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
                        };
                        users.Add(user);
                    }
                    reader.Close();

                    return users;
                }
            }
        }

        /// <summary>
        /// Instantiates a new User object through the SQL Data Reader
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>User object</returns>
        private User NewUserFromReader (SqlDataReader reader)
        {
            return new User()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                //FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
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
            };
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirstName, LastName, Email, CreateDateTime, 
                                                                 PrimaryPositionId, SecondaryPositionId, Admin,
                                                                 EmergencyName, EmergencyPhone)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, @CreateDateTime, 
                                                @PrimaryPositionId, @SecondaryPositionId, @Admin,
                                                @EmergencyName, @EmergencyPhone)";
                    //DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@PrimaryPositionId", user.PrimaryPositionId);
                    DbUtils.AddParameter(cmd, "@SecondaryPositionId", user.SecondaryPositionId);
                    DbUtils.AddParameter(cmd, "@Admin", false);
                    DbUtils.AddParameter(cmd, "@EmergencyName", user.EmergencyName);
                    DbUtils.AddParameter(cmd, "@EmergencyPhone", user.EmergencyPhone);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
