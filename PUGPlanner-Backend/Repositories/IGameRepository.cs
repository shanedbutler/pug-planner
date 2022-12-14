using PUGPlanner_Backend.Models;

namespace PUGPlanner_Backend.Repositories
{
    public interface IGameRepository
    {
        List<Game> Get();
        Game Get(int id);
        void Add(Game game);
    }
}
