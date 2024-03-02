
using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        /* Create your AutoMapper object mappings here */
        CreateMap<CreateClientFeedbackDto, ClientFeedback>();
        CreateMap<UpdateClientFeedbackDto, ClientFeedback>();
        CreateMap<ClientFeedback,ClientFeedbackDto>().ReverseMap();
        CreateMap<CreateApprovedTeamDto, ApprovedTeam>();
        CreateMap<UpdateApprovedTeamDto, ApprovedTeam>();
        CreateMap<ApprovedTeam, ApprovedTeamDto>().ReverseMap();
        CreateMap<CreateResourcesDtos, Resource>();
        CreateMap<CreateResourcesDtos,Resource>();
        CreateMap<Resource, ResourcesDtos>().ReverseMap();
        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();
    }
}
