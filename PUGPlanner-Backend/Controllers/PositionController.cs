using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUGPlanner_Backend.Repositories;

namespace PUGPlanner_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionRepository _positionRepository;
        public PositionController(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        // GET: api/<PositionController>
        [HttpGet("Get")]
        public IActionResult Get()
        {
            return Ok(_positionRepository.Get());
        }

    }
}
