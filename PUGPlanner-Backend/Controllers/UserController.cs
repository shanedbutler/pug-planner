using Microsoft.AspNetCore.Mvc;
using PUGPlanner_Backend.Repositories;
using PUGPlanner_Backend.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PUGPlanner_Backend.Controllers
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

        //// GET: api/<UserController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<UserController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<UserController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<UserController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<UserController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
