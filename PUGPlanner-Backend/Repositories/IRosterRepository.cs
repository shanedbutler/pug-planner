using PUGPlanner_Backend.Models;

namespace PUGPlanner_Backend.Repositories
{
    public interface IRosterRepository
    {
        GameRosterCount getCount(int gameId);
        void Add(Roster roster);
        void Delete(int id);
    }
}