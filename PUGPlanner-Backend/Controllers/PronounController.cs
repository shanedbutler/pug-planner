using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUGPlanner_Backend.Repositories;

namespace PUGPlanner_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PronounController : ControllerBase
    {
        private readonly IPronounRepository _pronounRepository;
        public PronounController(IPronounRepository pronounRepository)
        {
            _pronounRepository = pronounRepository;
        }

        // GET: api/<PronounController>
        [HttpGet("Get")]
        public IActionResult Get()
        {
            return Ok(_pronounRepository.Get());
        }

    }
}
