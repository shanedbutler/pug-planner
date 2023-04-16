using PUGPlannerAPI.Models;

namespace PUGPlannerAPI.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseUserId(string firebaseUserId);
        User Get(int id);
        List<User> GetAll();
        User GetByEmail(string email);
        List<User> GetByRosterGameId(int gameId);
        void Add(User user);
        void Update(User user);
    }
}
