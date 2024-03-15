using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class AuditHistory : Entity<Guid>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
        public Guid Id { get; set; }
        public DateTime DateOfAudit { get; set; }

        public string ReviewedBy { get; set; }

        public string Status { get; set; }

        public string ReviewedSection { get; set; }

        public string CommentQueries { get; set; }

        public string ActionItem { get; set; }
    }
}
