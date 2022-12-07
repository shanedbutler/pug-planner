using PUGPlanner_Backend.Models;

namespace PUGPlanner_Backend.Repositories
{
    public interface IUserRepository
    {
        User GetByEmail(string email);
        void Add(User user);
    }
}