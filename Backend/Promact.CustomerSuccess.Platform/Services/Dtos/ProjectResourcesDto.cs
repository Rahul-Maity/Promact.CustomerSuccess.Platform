using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ProjectResourcesDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }  // Assuming an ID field is required for uniqueness

        public Guid ProjectId { get; set; }

        public Guid ResourceId { get; set; }

        public double AllocationPercentage { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string Role { get; set; }
    }
}
