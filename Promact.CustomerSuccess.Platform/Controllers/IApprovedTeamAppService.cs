using Acme.TestAbp.Services.Dtos;
using Volo.Abp.Application.Dtos;

namespace Acme.TestAbp.Controllers
{
    public interface IApprovedTeamAppService
    {
        Task<ApprovedTeamDto> CreateAsync(CreateApprovedTeamDto input);
        Task DeleteAsync(Guid id);
        Task<PagedResultDto<ApprovedTeamDto>> GetListAsync(GetApprovedTeamsInput input);
        Task<ApprovedTeamDto> UpdateAsync(Guid id, UpdateApprovedTeamDto input);
    }
}