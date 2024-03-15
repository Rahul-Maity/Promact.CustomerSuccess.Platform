//using Auth0.AspNetCore.Authentication;
//using Microsoft.AspNetCore.Authentication;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Authentication.Cookies;
//using Microsoft.AspNetCore.Authorization;
//namespace Promact.CustomerSuccess.Platform.Controllers
//{
//    public class AccountController:Controller
//    {
//        public async Task Login(string returnUrl = "/")
//        {
//            var authenticationProperties = new LoginAuthenticationPropertiesBuilder()
//                // Indicate here where Auth0 should redirect the user after a login.
//                // Note that the resulting absolute Uri must be added to the
//                // **Allowed Callback URLs** settings for the app.
//                .WithRedirectUri(returnUrl)
//                .Build();

//            await HttpContext.ChallengeAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
//        }


//        [Authorize]
//        public async Task Logout()
//        {
//            var authenticationProperties = new LogoutAuthenticationPropertiesBuilder()
//                // Indicate here where Auth0 should redirect the user after a logout.
//                // Note that the resulting absolute Uri must be added to the
//                // **Allowed Logout URLs** settings for the app.
//                .WithRedirectUri(Url.Action("Index", "Home"))
//                .Build();

//            await HttpContext.SignOutAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
//            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
//        }
//    }
//}


using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Auth0.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace Promact.CustomerSuccess.Platform.Controllers
{



    public class AccountController : Controller
    {
        public async Task Login(string returnUrl = "/")
        {
            var authenticationProperties = new LoginAuthenticationPropertiesBuilder()

                .WithRedirectUri(returnUrl)
                .Build();

            await HttpContext.ChallengeAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
        }

        [Authorize]
        public async Task Logout()
        {
            var authenticationProperties = new LogoutAuthenticationPropertiesBuilder()
                // Indicate here where Auth0 should redirect the user after a logout.
                // Note that the resulting absolute Uri must be added to the
                // **Allowed Logout URLs** settings for the app.
                .WithRedirectUri(Url.Action("Index", "Home"))
                .Build();

            await HttpContext.SignOutAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }



    //[Route("api/[controller]")]
    //[ApiController]
    //public class AccountController : ControllerBase
    //{
    //    [HttpPost("login")]
    //    public async Task<ActionResult> Login(string returnUrl = "/")
    //    {
    //        try
    //        {
    //            var authenticationProperties = new LoginAuthenticationPropertiesBuilder()
    //                .WithRedirectUri(returnUrl)
    //                .Build();



    //            await HttpContext.ChallengeAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);

    //            // Return the redirect URL
    //            return Ok(new { redirectUrl = returnUrl });
    //            //return Ok();

    //        }
    //        catch (Exception ex)
    //        {
    //            return StatusCode(500, $"Internal server error: {ex.Message}");
    //        }
    //    }

    //    [HttpGet("logout")]
    //    public async Task<ActionResult> Logout()
    //    {
    //        try
    //        {
    //            var authenticationProperties = new LogoutAuthenticationPropertiesBuilder()
    //                .WithRedirectUri("http://localhost:4200/")
    //                .Build();

    //            // Sign out the user from Auth0 and other systems
    //            await HttpContext.SignOutAsync(Auth0Constants.AuthenticationScheme);
    //            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

    //            // Redirect the user back to the Angular frontend
    //            return Redirect("http://localhost:4200/");
    //        }
    //        catch (Exception ex)
    //        {
    //            return StatusCode(500, $"Internal server error: {ex.Message}");
    //        }
    //    }
    //}
}
