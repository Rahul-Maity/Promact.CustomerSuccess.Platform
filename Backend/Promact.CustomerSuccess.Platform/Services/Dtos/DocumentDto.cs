using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform
{
    public class DocumentDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
         public string Url { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Guid ProjectId { get; set; }
    }
}