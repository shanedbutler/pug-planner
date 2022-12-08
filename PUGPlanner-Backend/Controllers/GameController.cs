using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUGPlanner_Backend.Repositories;

namespace PUGPlanner_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepository;
        public GameController(IGameRepository gameRepository) 
        {
            _gameRepository = gameRepository;
        }

        // GET: api/<GameController>
        [HttpGet("Get")]
        public IActionResult Get()
        {
            return Ok(_gameRepository.Get());
        }

    }
}
