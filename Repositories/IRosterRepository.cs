using PUGPlanner_Backend.Models;

namespace PUGPlanner_Backend.Repositories
{
    public interface IRosterRepository
    {
        GameRosterCount GetCount(int gameId);
        UserRosterCount GetUserCount(int userId);
        void Add(Roster roster);
        void Delete(int userId, int gameId);
    }
}