using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Acme.TestAbp.AppServices;
using Acme.TestAbp.Services.Dtos;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace Acme.TestAbp.Controllers
{
    [Route("api/approved-teams")]
    public class ApprovedTeamController : ControllerBase
    {
        private readonly IApprovedTeamAppService _approvedTeamAppService;

        public ApprovedTeamController(IApprovedTeamAppService approvedTeamAppService)
        {
            _approvedTeamAppService = approvedTeamAppService;
        }

        [HttpGet]
        public async Task<PagedResultDto<ApprovedTeamDto>> GetListAsync(GetApprovedTeamsInput input)
        {
            return await _approvedTeamAppService.GetListAsync(input);
        }

        [HttpPost]
        public async Task<ApprovedTeamDto> CreateAsync(CreateApprovedTeamDto input)
        {
            return await _approvedTeamAppService.CreateAsync(input);
        }

        [HttpPut("{id}")]
        public async Task<ApprovedTeamDto> UpdateAsync(Guid id, UpdateApprovedTeamDto input)
        {
            return await _approvedTeamAppService.UpdateAsync(id, input);
        }

        [HttpDelete("{id}")]
        public async Task DeleteAsync(Guid id)
        {
            await _approvedTeamAppService.DeleteAsync(id);
        }
    }
}
