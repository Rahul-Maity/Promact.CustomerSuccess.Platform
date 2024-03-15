namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateStakeholderDto
    {
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public StakeholderTitle Title { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
    }
}
