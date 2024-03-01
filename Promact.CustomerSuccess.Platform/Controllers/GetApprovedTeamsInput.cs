
using System;

namespace Acme.TestAbp.Controllers
{
    public class GetApprovedTeamsInput
    {
        public string TeamName { get; set; }
        public string Role { get; set; }
        public int? AvailabilityPercentage { get; set; }
        public DateTime? DurationFrom { get; set; }
        public DateTime? DurationTo { get; set; }
    }
}