using Microsoft.AspNetCore.Mvc;
using HurricaneAPI.Models;
using HurricaneAPI.BL;
using Microsoft.AspNetCore.Cors;

namespace HurricaneAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class HurricaneInfoController : Controller
    {
        private readonly IHurricaneBL _HurricaneBL;
        public HurricaneInfoController(IHurricaneBL hurricaneBL)
        {
            _HurricaneBL = hurricaneBL;
        }

        //I always test controllers and initial connections with this endpoint, it servers no other purpose
        [HttpGet("default")]
        public string ControllerTest()
        {
            return "default";
        }

        [HttpPost("all")]
        public async Task<ActionResult<IEnumerable<Hurricane>>> GetAll([FromBody] SearchArea searchArea)
        {
            var hurricanes = await _HurricaneBL.GetAllInArea(searchArea);
            return Ok(hurricanes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hurricane>> Get(string id)
        {
            var hurricane = await _HurricaneBL.GetSingleIfAny(id);

            if (hurricane == null)
            {
                return NotFound();
            }
            return Ok(hurricane);
        }

        [HttpGet("named")]
        public async Task<ActionResult<List<Hurricane>>> GetNamed()
        {
            var hurricanes = await _HurricaneBL.GetNamed();

            if (hurricanes == null)
            {
                return NotFound();
            }
            return Ok(hurricanes);

        }

        //added CRUD operations but these are not used

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Hurricane hurricane)
        {
            await _HurricaneBL.Create(hurricane);

            return CreatedAtAction(nameof(Get), new { id = hurricane.Id }, hurricane);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Hurricane newHurricane)
        {
            var hurricane = await _HurricaneBL.GetSingleIfAny(id);

            if (hurricane == null)
            {
                return NotFound();
            }

            newHurricane.Id = hurricane.Id;

            await _HurricaneBL.Update(id, newHurricane);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var hurricane = await _HurricaneBL.GetSingleIfAny(id);

            if (hurricane == null)
            {
                return NotFound();
            }

            await _HurricaneBL.Delete(id);

            return NoContent();
        }
    }
}
