using PUGPlanner_FS.Models;

namespace PUGPlanner_FS.Repositories
{
    public interface IPositionRepository
    {
        List<Position> Get();
    }
}