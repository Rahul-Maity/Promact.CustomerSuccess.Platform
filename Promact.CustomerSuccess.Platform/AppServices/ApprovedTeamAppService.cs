using Volo.Abp.Application.Services;
using Acme.TestAbp.Entities;
using Acme.TestAbp.Repositories;
using Acme.TestAbp.Services.Dtos;

namespace Acme.TestAbp.AppServices
{
    public class ApprovedTeamAppService : ApplicationService
    {
        private readonly IApprovedTeamRepository _approvedTeamRepository;

        public ApprovedTeamAppService(IApprovedTeamRepository approvedTeamRepository)
        {
            _approvedTeamRepository = approvedTeamRepository;
        }

        public async Task<ApprovedTeamDto> GetApprovedTeamAsync(Guid id)
        {
            var team = await _approvedTeamRepository.GetAsync(id);
            return ObjectMapper.Map<ApprovedTeam, ApprovedTeamDto>(team);
        }

        public async Task<ApprovedTeamDto> CreateApprovedTeamAsync(CreateApprovedTeamDto input)
        {
            var team = new ApprovedTeam
            {
                TeamName = input.TeamName,
                NumberOfResources = input.NumberOfResources,
                Role = input.Role,
                AvailabilityPercentage = input.AvailabilityPercentage,
                Duration = input.Duration
            };

            team = await _approvedTeamRepository.InsertAsync(team, autoSave: true);
            return ObjectMapper.Map<ApprovedTeam, ApprovedTeamDto>(team);
        }

        public async Task<ApprovedTeamDto> UpdateApprovedTeamAsync(UpdateApprovedTeamDto input)
        {
            var team = await _approvedTeamRepository.GetAsync(input.Id);

            team.TeamName = input.TeamName;
            team.NumberOfResources = input.NumberOfResources;
            team.Role = input.Role;
            team.AvailabilityPercentage = input.AvailabilityPercentage;
            team.Duration = input.Duration;

            team = await _approvedTeamRepository.UpdateAsync(team, autoSave: true);
            return ObjectMapper.Map<ApprovedTeam, ApprovedTeamDto>(team);
        }

        public async Task DeleteApprovedTeamAsync(Guid id)
        {
            await _approvedTeamRepository.DeleteAsync(id);
        }
    }
}
