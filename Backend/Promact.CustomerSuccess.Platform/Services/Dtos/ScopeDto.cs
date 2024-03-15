using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ScopeDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }

        public Guid ProjectId { get; set; }

        public string IncludedItems { get; set; }   

        public string ExcludedItems { get; set; }

        public string AdditionalNotes { get; set; }
    }
}
