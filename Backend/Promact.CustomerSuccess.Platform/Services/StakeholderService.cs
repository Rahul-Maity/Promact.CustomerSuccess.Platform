using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class StakeholderService :
        CrudAppService<
            Stakeholder,
            StakeholderDto,
          


            Guid,
            PagedAndSortedResultRequestDto,
            CreateStakeholderDto,
            UpdateStakeholderDto


            >,
        IStakeholderService
    {
        public StakeholderService(IRepository<Stakeholder, Guid> StakeholderRepository) :
            base(StakeholderRepository)
        {
        }
    }
}
