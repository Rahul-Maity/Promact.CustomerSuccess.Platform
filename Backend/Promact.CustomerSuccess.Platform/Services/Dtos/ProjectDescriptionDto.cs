using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ProjectDescriptionDto : IEntityDto<Guid>
    {
        public Guid ProjectId { get; set; }
        public Guid Id { get; set; }
        public string Description { get; set; }
        public TechStack TechStack { get; set; }
        public string DetailedTimeline { get; set; }
    }
}
