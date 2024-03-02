using Volo.Abp.Application.Services;

using Promact.CustomerSuccess.Platform.Entities;

using Volo.Abp.Application.Dtos;
using Promact.CustomerSuccess.Platform.Services.Dtos;
//using Acme.TestAbp.Controllers;
using Volo.Abp.Domain.Repositories;

//namespace Acme.TestAbp.AppServices;
namespace Promact.CustomerSuccess.Platform.Services;

public class ApprovedTeamAppService:
        CrudAppService<
           ApprovedTeam,
            ApprovedTeamDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateApprovedTeamDto,
            UpdateApprovedTeamDto
            >,
        IApprovedTeamAppService
    {
        public ApprovedTeamAppService(IRepository<ApprovedTeam,Guid> repository)
            : base(repository) { }
    }


