using System;
using Volo.Abp.Domain.Entities;

namespace Acme.TestAbp.Entities
{
    public class ApprovedTeam : Entity<Guid>
    {
        public string TeamName { get; set; }
        public int NumberOfResources { get; set; }
        public string Role { get; set; }
        public int AvailabilityPercentage { get; set; }
        public DateTime Duration { get; set; }
    }
}
