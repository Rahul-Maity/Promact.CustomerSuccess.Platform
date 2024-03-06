using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ApprovedTeam : Entity<Guid>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
        public Guid Id { get; set; }  // Primary key
        public int Phase { get; set; } // Phase number
        public int NumberOfResources { get; set; } // Number of resources
        public string Role { get; set; } // Role
        public int AvailabilityPercentage { get; set; } // Availability percentage
        public int Duration { get; set; }
    }
}
