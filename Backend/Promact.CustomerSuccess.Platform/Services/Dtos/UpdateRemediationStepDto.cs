namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateRemediationStepDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid RiskProfileId { get; set; }
    }
}
