using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUGPlanner_Backend.Models;
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

        // GET: api/<GameController>
        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_gameRepository.Get(id));
        }

        // POST api/<GameController>
        // GETs back newly created ojbect via Get(id)
        [HttpPost]
        public IActionResult Create(Game game)
        {
            _gameRepository.Add(game);

            return CreatedAtAction("Get", new {id = game.Id}, game);
        }

        [HttpPut]
        public IActionResult Update(Game game)
        {
            _gameRepository.Update(game);

            return NoContent();
        }

        [HttpDelete("Delete")]
        public IActionResult Delete(int id)
        {
            _gameRepository.Delete(id);
            return NoContent();
        }
    }
    
}
