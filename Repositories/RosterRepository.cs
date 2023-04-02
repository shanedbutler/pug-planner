using PUGPlannerAPI.Models;
using PUGPlannerAPI.Utils;

namespace PUGPlannerAPI.Repositories
{
    public class RosterRepository : BaseRepository, IRosterRepository
    {
        public RosterRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Queries the Roster table by gameId and counts entries.
        /// Returned object includes current player count and max players through join.
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns>GameRosterCount object</returns>
        public GameRosterCount GetCount(int gameId)
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

        /// <summary>
        /// Queries the Roster table by userId and counts entries.
        /// Returned object inludes userId passed in, and number of "appearances" on roster table
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>UserRosterCount object</returns>
        public UserRosterCount GetUserCount(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT GameRoster.UserProfileId, Count(GameRoster.UserProfileId) as 'Appearences'
                        FROM GameRoster
                        GROUP BY GameRoster.UserProfileId
                        HAVING GameRoster.UserProfileId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    UserRosterCount userRosterCount = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userRosterCount = new UserRosterCount()
                        {
                            UserProfileId = userId,
                            Appearances = DbUtils.GetInt(reader, "Appearences"),
                        };
                    }
                    reader.Close();

                    if (userRosterCount != null)
                    {
                        return userRosterCount;
                    }
                    else
                    {
                        UserRosterCount userNoRosterCount = new UserRosterCount()
                        {
                            UserProfileId = userId,
                            Appearances = 0,
                        };

                        return userNoRosterCount;
                    }
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
