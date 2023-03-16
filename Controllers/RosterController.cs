using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUGPlanner_FS.Models;
using PUGPlanner_FS.Repositories;

namespace PUGPlanner_FS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RosterController : ControllerBase
    {
        private readonly IRosterRepository _rosterRepository;
        public RosterController(IRosterRepository rosterRepository)
        {
            _rosterRepository = rosterRepository;
        }

        [HttpGet("GetCount")]
        public IActionResult GetCount(int gameId) 
        {
            var count = _rosterRepository.GetCount(gameId);

            return Ok(count);
        }

        [HttpGet("GetUserCount")]
        public IActionResult GetUserCount(int userId)
        {
            var count = _rosterRepository.GetUserCount(userId);

            return Ok(count);
        }

        // POST: api/<RosterController>
        [HttpPost]
        public IActionResult Create(Roster roster)
        {
            _rosterRepository.Add(roster);

            return Ok(roster);
        }

        // DELETE: api<RosterController>/Delete?userId={userId}&gameId={gameId}
        [HttpDelete("Delete")]
        public IActionResult Delete(int userId, int gameId)
        {
            _rosterRepository.Delete(userId, gameId);
            return NoContent();
        }
    }
}
