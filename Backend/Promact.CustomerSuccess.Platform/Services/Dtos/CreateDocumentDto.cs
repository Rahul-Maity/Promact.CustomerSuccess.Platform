namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateDocumentDto
    {
        public string Url { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Guid ProjectId { get; set; }
    }
}
