using PUGPlanner_Backend.Models;
using PUGPlanner_Backend.Utils;

namespace PUGPlanner_Backend.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Get a User by their email address
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
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
                               up.PrimaryPosition, up.SecondaryPosition
                          FROM [UserProfile] up
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            //FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            PrimaryPosition = DbUtils.GetInt(reader, "PrimaryPosition"),
                            SecondaryPosition = DbUtils.GetInt(reader, "SecondaryPosition"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Admin = reader.GetBoolean(reader.GetOrdinal("IsActive"))
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

    }
}
