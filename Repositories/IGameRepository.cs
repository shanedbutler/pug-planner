using PUGPlannerAPI.Models;

namespace PUGPlannerAPI.Repositories
{
    public interface IGameRepository
    {
        List<Game> Get();
        Game Get(int id);
        void Add(Game game);
        void Update(Game game);
        void Delete (int id);
    }
}
