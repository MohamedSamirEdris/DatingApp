using System.Linq;
using API.DTOS;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
        CreateMap<AppUser,MemberDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                src => src.Photos.Count != 0 ? src.Photos.FirstOrDefault(x => x.IsMain).Url : "" ))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src != null ? src.DateOfBirth.CalculateAge() : 0));

            CreateMap<Photo , PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
        }
    }
}