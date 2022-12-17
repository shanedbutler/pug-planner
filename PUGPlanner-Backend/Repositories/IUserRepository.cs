using PUGPlanner_Backend.Models;

namespace PUGPlanner_Backend.Repositories
{
    public interface IUserRepository
    {
        User Get(int id);
        User GetByEmail(string email);
        List<User> GetByRosterGameId(int gameId);
        void Add(User user);
    }
}
