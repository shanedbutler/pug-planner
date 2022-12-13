using PUGPlanner_Backend.Models;
using PUGPlanner_Backend.Utils;

namespace PUGPlanner_Backend.Repositories
{
    public class RosterRepository : BaseRepository, IRosterRepository
    {
        public RosterRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Queries the Roster table by gameId and counts entries.
        /// Returned object includes currentl player count and max players through join.
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns>Game Roster Count object</returns>
        public GameRosterCount getCount(int gameId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Game.Id as 'GameId', MaxPlayers, Count(GameId) as PlayerCount
                          FROM Game LEFT JOIN GameRoster
                            ON Game.Id = GameRoster.GameId
                         GROUP BY Game.Id, MaxPlayers
                         HAVING Game.Id = @gameId";

                    DbUtils.AddParameter(cmd, "@gameId", gameId);

                    GameRosterCount gameRosterCount = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        gameRosterCount = new GameRosterCount()
                        {
                            GameId = DbUtils.GetInt(reader, "GameId"),
                            CurrentPlayers = DbUtils.GetInt(reader, "PlayerCount"),
                            MaxPlayers = DbUtils.GetInt(reader, "MaxPlayers"),
                        };
                    }
                    reader.Close();

                    return gameRosterCount;
                }
            }
        }

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

        public void Delete(int userId, int gameId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM GameRoster
                        WHERE UserProfileId = @userId AND GameId = @gameId";

                    DbUtils.AddParameter(cmd, "@userId", userId);
                    DbUtils.AddParameter(cmd, "@gameId", gameId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
