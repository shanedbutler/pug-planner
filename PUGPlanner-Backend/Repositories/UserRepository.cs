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
                        SELECT up.Id as UserId, up.FirstName, up.LastName, 
                               up.Email, up.Phone, up.Club,
                               up.CreateDateTime, up.[Admin], up.PronounId,
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone, up.Active,
                               p.[Name] as PrimaryPositionName, p2.[Name] as SecondaryPositionName,
                               p.FullName as PrimaryPositionFullName, p2.FullName as SecondaryPositionFullName,
                               pn.[Name] as PronounName
                          FROM [UserProfile] up
                              JOIN Pronoun pn ON up.PronounId = pn.Id
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

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id as UserId, up.FirstName, up.LastName, 
                               up.Email, up.Phone, up.Club,
                               up.CreateDateTime, up.[Admin], up.PronounId,
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone, up.Active,
                               p.[Name] as PrimaryPositionName, p2.[Name] as SecondaryPositionName,
                               p.FullName as PrimaryPositionFullName, p2.FullName as SecondaryPositionFullName,
                               pn.[Name] as PronounName
                          FROM [UserProfile] up
                              JOIN Pronoun pn ON up.PronounId = pn.Id
                              JOIN [Position] p ON up.PrimaryPositionId = p.id
                              JOIN [Position] p2 ON up.SecondaryPositionId = p2.id
                          ORDER BY up.LastName";

                    List<User> users = new List<User>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }
                    reader.Close();

                    return users;
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
                        SELECT up.Id as UserId, up.FirstName, up.LastName, 
                               up.Email, up.Phone, up.Club,
                               up.CreateDateTime, up.[Admin], up.PronounId,
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone, up.Active,
                               p.[Name] as PrimaryPositionName, p2.[Name] as SecondaryPositionName,
                               p.FullName as PrimaryPositionFullName, p2.FullName as SecondaryPositionFullName,
                               pn.[Name] as PronounName
                          FROM [UserProfile] up
                              LEFT JOIN Pronoun pn ON up.PronounId = pn.Id
                              JOIN [Position] p ON up.PrimaryPositionId = p.Id
                              JOIN [Position] p2 ON up.SecondaryPositionId = p2.Id
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
                               up.Id as UserId, up.FirstName, up.LastName, 
                               up.Email, up.Phone, up.Club,
                               up.CreateDateTime, up.[Admin], up.PronounId,
                               up.PrimaryPositionId, up.SecondaryPositionId,
                               up.EmergencyName, up.EmergencyPhone, up.Active,
                               p.[Name] as PrimaryPositionName, p2.[Name] as SecondaryPositionName,
                               p.FullName as PrimaryPositionFullName, p2.FullName as SecondaryPositionFullName,
                               pn.[Name] as PronounName
                        FROM GameRoster r
                            JOIN UserProfile up ON r.UserProfileId = up.Id
                            LEFT JOIN Pronoun pn ON up.PronounId = pn.Id
                            JOIN [Position] p ON up.PrimaryPositionId = p.Id
                            JOIN [Position] p2 ON up.SecondaryPositionId = p2.Id
                        WHERE GameId = @gameId";

                    DbUtils.AddParameter(cmd, "@gameId", gameId);

                    List<User> users = new List<User>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
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
        private User NewUserFromReader(SqlDataReader reader)
        {
            return new User()
            {
                Id = DbUtils.GetInt(reader, "UserId"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                Email = DbUtils.GetString(reader, "Email"),
                Phone = DbUtils.GetString(reader, "Phone"),
                Club = DbUtils.GetNullableString(reader, "Club"),
                PrimaryPositionId = DbUtils.GetInt(reader, "PrimaryPositionId"),
                SecondaryPositionId = DbUtils.GetInt(reader, "SecondaryPositionId"),
                PronounId = DbUtils.GetNullableInt(reader, "PronounId"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                Admin = DbUtils.GetBool(reader, "Admin"),
                EmergencyName = DbUtils.GetString(reader, "EmergencyName"),
                EmergencyPhone = DbUtils.GetString(reader, "EmergencyPhone"),
                Active = DbUtils.GetBool(reader, "Active"),
                Position = new UserPosition()
                {
                    Primary = DbUtils.GetNullableString(reader, "PrimaryPositionName"),
                    Secondary = DbUtils.GetNullableString(reader, "SecondaryPositionName"),
                    PrimaryFull = DbUtils.GetNullableString(reader, "PrimaryPositionFullName"),
                    SecondaryFull = DbUtils.GetNullableString(reader, "SecondaryPositionFullName"),
                },
                Pronoun = new Pronoun()
                {
                    Id = DbUtils.GetNullableInt(reader, "PronounId"),
                    Name = DbUtils.GetNullableString(reader, "PronounName"),
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
                    cmd.CommandText = @"INSERT INTO UserProfile (FirstName, LastName, Email, Phone, Club, CreateDateTime, 
                                                                 PrimaryPositionId, SecondaryPositionId, Admin,
                                                                 PronounId, EmergencyName, EmergencyPhone, Active)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, @Phone, @Club, @CreateDateTime, 
                                                @PrimaryPositionId, @SecondaryPositionId, @Admin,
                                                @PronounId, @EmergencyName, @EmergencyPhone, @Active)";
                    //DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Phone", user.Phone);
                    DbUtils.AddParameter(cmd, "@Club", user.Club);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@PrimaryPositionId", user.PrimaryPositionId);
                    DbUtils.AddParameter(cmd, "@SecondaryPositionId", user.SecondaryPositionId);
                    DbUtils.AddParameter(cmd, "@Admin", false);
                    DbUtils.AddParameter(cmd, "@PronounId", user.PronounId);
                    DbUtils.AddParameter(cmd, "@EmergencyName", user.EmergencyName);
                    DbUtils.AddParameter(cmd, "@EmergencyPhone", user.EmergencyPhone);
                    DbUtils.AddParameter(cmd, "@Active", 1);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                            SET
                                FirstName = @FirstName,
                                LastName = @LastName,
                                Email = @Email,
                                Phone = @Phone,
                                Club = @Club,
                                PrimaryPositionId = @PrimaryPositionId,
                                SecondaryPositionId = @SecondaryPositionId,
                                Admin = @Admin,
                                PronounId = @PronounId,
                                EmergencyName = @EmergencyName,
                                EmergencyPhone = @EmergencyPhone,
                                Active = @Active
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Phone", user.Phone);
                    DbUtils.AddParameter(cmd, "@Club", user.Club);
                    DbUtils.AddParameter(cmd, "@PrimaryPositionId", user.PrimaryPositionId);
                    DbUtils.AddParameter(cmd, "@SecondaryPositionId", user.SecondaryPositionId);
                    DbUtils.AddParameter(cmd, "@Admin", user.Admin);
                    DbUtils.AddParameter(cmd, "@PronounId", user.PronounId);
                    DbUtils.AddParameter(cmd, "@EmergencyName", user.EmergencyName);
                    DbUtils.AddParameter(cmd, "@EmergencyPhone", user.EmergencyPhone);
                    DbUtils.AddParameter(cmd, "@Active", user.Active);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
