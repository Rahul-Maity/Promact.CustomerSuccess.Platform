using AutoMapper.Internal.Mappers;
using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ApprovedTeamService :
         CrudAppService<
             ApprovedTeam,                // The entity type
             ApprovedTeamDto,            // DTO used for client requests and responses
             Guid,                        // Primary key type (in this case, Guid)
             PagedAndSortedResultRequestDto, // Used for pagination and sorting
             CreateApprovedTeamDto,      // DTO used for creating entities
             UpdateApprovedTeamDto>,     // DTO used for updating entities
         IApprovedTeamService            // The contract interface
    {
        public ApprovedTeamService(IRepository<ApprovedTeam, Guid> approvedTeamRepository)
            : base(approvedTeamRepository)
        {
          
        }
    }
}
