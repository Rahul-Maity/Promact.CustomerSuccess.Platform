using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        /* Create your AutoMapper object mappings here */
        CreateMap<CreateApprovedTeamDto, ApprovedTeam>();
        CreateMap<UpdateApprovedTeamDto, ApprovedTeam>();
        CreateMap<ApprovedTeam, ApprovedTeamDto>().ReverseMap();

        CreateMap<CreateMeetingMinuteDto, MeetingMinute>();
        CreateMap<UpdateMeetingMinuteDto, MeetingMinute>();
        CreateMap<MeetingMinute, MeetingMinuteDto>().ReverseMap();

        CreateMap<CreateProjectUpdateDto, ProjectUpdate>();
        CreateMap<UpdateProjectUpdateDto, ProjectUpdate>();
        CreateMap<ProjectUpdate,ProjectUpdateDto>().ReverseMap();


        CreateMap<CreateProjectResourcesDto, ProjectResources>();
        CreateMap<UpdateProjectResourcesDto, ProjectResources>();
        CreateMap<ProjectResources,ProjectResourcesDto>().ReverseMap();

        CreateMap<CreateClientFeedbackDto, ClientFeedback>();
        CreateMap<UpdateClientFeedbackDto, ClientFeedback>();
        CreateMap<ClientFeedback, ClientFeedbackDto>().ReverseMap();

        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();
    }
}
