using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Stakeholder : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {

        public Guid Id { get; set; }

        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
      
        public StakeholderTitle Title { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
    }
}
