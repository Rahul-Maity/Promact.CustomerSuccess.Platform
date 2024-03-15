namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreatePhaseMilestoneDto
    {
        public Guid ProjectId { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Comments { get; set; }
        public MilestoneOrPhaseStatus Status { get; set; }
    }
}
