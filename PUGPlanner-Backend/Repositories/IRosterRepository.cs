using PUGPlanner_Backend.Models;

namespace PUGPlanner_Backend.Repositories
{
    public interface IRosterRepository
    {
        void Add(Roster roster);
        void Delete(int id);
    }
}