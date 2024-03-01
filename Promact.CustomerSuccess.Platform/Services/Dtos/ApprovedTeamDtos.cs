namespace Acme.TestAbp.Services.Dtos
{
    public class ApprovedTeamDto
    {
        public Guid Id { get; set; }
        public string TeamName { get; set; }
        public int NumberOfResources { get; set; }
        public string Role { get; set; }
        public int AvailabilityPercentage { get; set; }
        public DateTime Duration { get; set; }
    }

    public class CreateApprovedTeamDto
    {
        public string TeamName { get; set; }
        public int NumberOfResources { get; set; }
        public string Role { get; set; }
        public int AvailabilityPercentage { get; set; }
        public DateTime Duration { get; set; }
    }

    public class UpdateApprovedTeamDto
    {
        public Guid Id { get; set; }
        public string TeamName { get; set; }
        public int NumberOfResources { get; set; }
        public string Role { get; set; }
        public int AvailabilityPercentage { get; set; }
        public DateTime Duration { get; set; }
    }
}
