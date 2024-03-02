
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

//namespace Acme.TestAbp.AppServices;
namespace Promact.CustomerSuccess.Platform.Services;

    public interface IApprovedTeamAppService:
    
        ICrudAppService<
            ApprovedTeamDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateApprovedTeamDto,
            UpdateApprovedTeamDto>
{

}
            
    
