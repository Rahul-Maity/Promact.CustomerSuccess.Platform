namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateStakeholderDto
    {
        public Guid ProjectId { get; set; }
        public StakeholderTitle Title { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
    }
}
