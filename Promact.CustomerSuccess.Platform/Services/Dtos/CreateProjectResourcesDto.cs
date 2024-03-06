namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateProjectResourcesDto
    {
        public Guid ProjectId { get; set; }

        public Guid ResourceId { get; set; }

        public double AllocationPercentage { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string Role { get; set; }
    }
}
