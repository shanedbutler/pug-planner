using PUGPlannerAPI.Models;

namespace PUGPlannerAPI.Repositories
{
    public interface IRosterRepository
    {
        GameRosterCount GetCount(int gameId);
        UserRosterCount GetUserCount(int userId);
        void Add(Roster roster);
        void Delete(int userId, int gameId);
    }
}