using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Web;

namespace SapiensProject.Controllers
{

    [Authorize]
    [Route("[controller]")]
    public class MyApiController : ApiController
    {
        [HttpGet]
        [Route("api/mvc/test")]
        public IHttpActionResult test()
        {
            //token = Request.Headers.GetValues("token");
            //var tokenHandler = new JwtSecurityTokenHandler();
            IEnumerable<string> headerValues;
            var token = string.Empty;
            if (Request.Headers.TryGetValues("Authorization", out headerValues))
            {
                token = headerValues.FirstOrDefault();
            }

            //var tokenHandler = new JwtSecurityTokenHandler();
            if (HttpContext.Current.User.Identity.IsAuthenticated)
            {
                return Json(new
                {
                    Code = "200",
                });
            } else
            {
                return Json(new
                {
                    Code = "401",
                });
            }

        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/mvc/test1")]
        public IHttpActionResult test1()
        {
            return Json(new
            {
                Code = "200",
            });
        }
    }
}
