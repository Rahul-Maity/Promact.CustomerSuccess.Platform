using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class RemediationStepDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid RiskProfileId { get; set; }
    }
}
