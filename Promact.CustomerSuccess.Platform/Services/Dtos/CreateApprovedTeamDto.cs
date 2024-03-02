using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateApprovedTeamDto
    {
        [Required]
        [StringLength(128)]
        public string TeamName { get; set; }
        public int NumberOfResources { get; set; }
        public string Role { get; set; }
        public int AvailabilityPercentage { get; set; }
        public DateTime Duration { get; set; }

    }
}
