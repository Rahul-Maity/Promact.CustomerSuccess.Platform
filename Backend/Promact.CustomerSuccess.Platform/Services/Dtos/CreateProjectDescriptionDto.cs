namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateProjectDescriptionDto
    {
        public Guid ProjectId { get; set; }
        public string Description { get; set; }
        public TechStack TechStack { get; set; }
        public string DetailedTimeline { get; set; }
    }
}
