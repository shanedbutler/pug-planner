using PUGPlanner_Backend.Models;
using PUGPlanner_Backend.Utils;

namespace PUGPlanner_Backend.Repositories
{
    public class RosterRepository : BaseRepository, IRosterRepository
    {
        public RosterRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Roster roster)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO GameRoster (GameId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@GameId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@GameId", roster.GameId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", roster.UserProfileId);

                    roster.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM GameRoster
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
             }
        }

    }
}
