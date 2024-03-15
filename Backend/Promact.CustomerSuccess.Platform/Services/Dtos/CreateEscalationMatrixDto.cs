namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateEscalationMatrixDto
    {
        public string Name { get; set; }

        public string Role { get; set; }

        public EscalationMatrixLevels Level { get; set; }

        public EscalationType EscalationType { get; set; }

        public Guid ProjectId { get; set; }
    }
}
