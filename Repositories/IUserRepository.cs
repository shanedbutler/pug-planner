using PUGPlanner_FS.Models;

namespace PUGPlanner_FS.Repositories
{
    public interface IUserRepository
    {
        User Get(int id);
        List<User> GetAll();
        User GetByEmail(string email);
        List<User> GetByRosterGameId(int gameId);
        void Add(User user);
        void Update(User user);
    }
}
