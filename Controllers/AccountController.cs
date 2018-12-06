using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using mines.Areas.Identity.Data;
using mines.ViewModels;
using mines.Helpers;
 

namespace AngularASPNETCore2WebApiAuth.Controllers
{
    [Route("[controller]")] 
    public class AccountsController : Controller
    {
        private readonly minesIdentityDbContext _appDbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<IdentityUser> userManager, IMapper mapper, minesIdentityDbContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<IdentityUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }
        [HttpGet]
        public async Task<IActionResult> Get(){
            return new JsonResult(_userManager.GetUserName(User));
        }
    }
}