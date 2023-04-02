using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PUGPlannerAPI.Repositories;

namespace PUGPlannerAPI.Controllers
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
