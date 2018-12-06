using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace mines.ViewModels
{
    public class RegistrationViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
 
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {

            CreateMap<RegistrationViewModel, IdentityUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}