namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateDocumentVersionDto
    {
        public ChangeType ChangeType { get; set; }

        public string Changes { get; set; }

        public string ChangeReason { get; set; }

        public Guid DocumentId { get; set; }
    }
}
