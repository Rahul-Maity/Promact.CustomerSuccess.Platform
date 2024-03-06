using AutoMapper.Internal.Mappers;
using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class MeetingMinuteService :
        CrudAppService<
            MeetingMinute,                  // The entity type
            MeetingMinuteDto,              // DTO used for client requests and responses
            Guid,                          // Primary key type (in this case, Guid)
            PagedAndSortedResultRequestDto, // Used for pagination and sorting
            CreateMeetingMinuteDto,        // DTO used for creating entities
            UpdateMeetingMinuteDto>,       // DTO used for updating entities
        IMeetingMinuteService            // The contract interface
    {
        public MeetingMinuteService(IRepository<MeetingMinute, Guid> meetingMinuteRepository)
            : base(meetingMinuteRepository)
        {
          
        }
    }
}
