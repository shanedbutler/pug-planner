using PUGPlanner_Backend.Models;

namespace PUGPlanner_Backend.Repositories
{
    public interface IPositionRepository
    {
        List<Position> Get();
    }
}