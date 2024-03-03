using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ApprovedTeam : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public Guid Id { get; set; }  // Primary key
        public int Phase { get; set; } // Phase number
        public int NumberOfResources { get; set; } // Number of resources
        public string Role { get; set; } // Role
        public int AvailabilityPercentage { get; set; } // Availability percentage
        public TimeSpan Duration { get; set; }
    }
}
