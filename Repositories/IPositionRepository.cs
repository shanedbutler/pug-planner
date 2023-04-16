using PUGPlannerAPI.Models;

namespace PUGPlannerAPI.Repositories
{
    public interface IPositionRepository
    {
        List<Position> Get();
    }
}