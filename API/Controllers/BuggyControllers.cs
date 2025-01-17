using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyControllers : BaseApiController
    {
        private readonly DataContext __context;
        public BuggyControllers(DataContext _context)
        {
            __context = _context;
        }

        [Authorize]

        [HttpGet("auth")]

        public ActionResult<string> GetSecret()
        {
            return "Secret text";
        }

        [HttpGet("auth")]

        public ActionResult<AppUser> GetNotFound()
        {
            var thing = __context.Users.Find(-1);

            if (thing == null ) return NotFound();

            return Ok(thing);
        }

        [HttpGet("server-error")]

        public ActionResult<string> GetServerError()
        {
        
            
                
            var thing = __context.Users.Find(-1);
            var thingToReturn = thing.ToString();

            return thingToReturn;
            
            




        }

        [HttpGet("bad-request")]

        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }

    
    }
}