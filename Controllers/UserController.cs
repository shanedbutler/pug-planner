using Microsoft.AspNetCore.Mvc;
using PUGPlanner_FS.Repositories;
using PUGPlanner_FS.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PUGPlanner_FS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/<UserController>/Get/5
        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.Get(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: api/<UserController>/GetAll
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_userRepository.GetAll());
        }

        // GET: api/<UserController>/Get?email=string
        [HttpGet("Get")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: api/<UserController>/Get?gameid=int
        [HttpGet("GetRoster")]
        public IActionResult GetRoster(int gameId)
        {
            var users = _userRepository.GetByRosterGameId(gameId);

            if (users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }

        // POST api/<UserController>
        // GETs back newly created object via GetByEmail
        [HttpPost]
        public IActionResult Create(User user)
        {
            _userRepository.Add(user);

            return CreatedAtAction("GetByEmail", new {email = user.Email}, user);
        }

        [HttpPut]
        public IActionResult Update(User user)
        {
            _userRepository.Update(user);

            return AcceptedAtAction("Get", new { id = user.Id }, user);
        }

    }
}
