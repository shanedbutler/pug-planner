using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUGPlanner_Backend.Models;
using PUGPlanner_Backend.Repositories;

namespace PUGPlanner_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RosterController : ControllerBase
    {
        private readonly IRosterRepository _rosterRepository;
        public RosterController(IRosterRepository rosterRepository)
        {
            _rosterRepository = rosterRepository;
        }

        // POST: api/<RosterController>
        [HttpPost]
        public IActionResult Create(Roster roster)
        {
            _rosterRepository.Add(roster);

            return Ok(roster);
        }
    }
}
