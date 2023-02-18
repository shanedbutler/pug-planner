using PUGPlanner_FS.Models;

namespace PUGPlanner_FS.Repositories
{
    public interface IRosterRepository
    {
        GameRosterCount GetCount(int gameId);
        UserRosterCount GetUserCount(int userId);
        void Add(Roster roster);
        void Delete(int userId, int gameId);
    }
}