using Microsoft.Data.SqlClient;
using PUGPlanner_Backend.Models;
using PUGPlanner_Backend.Utils;

namespace PUGPlanner_Backend.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

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
                               up.Email, up.CreateDateTime, up.Admin,
                               up.PrimaryPositionId, up.SecondaryPositionId,
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
                PrimaryPosition = DbUtils.GetInt(reader, "PrimaryPositionId"),
                SecondaryPosition = DbUtils.GetInt(reader, "SecondaryPositionId"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                Admin = reader.GetBoolean(reader.GetOrdinal("Admin")),
                Position = new Position()
                {
                    Primary = DbUtils.GetString(reader, "PrimaryPositionName"),
                    Secondary = DbUtils.GetString(reader, "SecondaryPositionName"),
                }
            };
        }

    }
}
