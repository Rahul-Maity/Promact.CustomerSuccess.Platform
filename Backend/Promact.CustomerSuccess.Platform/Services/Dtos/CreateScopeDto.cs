namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateScopeDto
    {
        public Guid ProjectId { get; set; }

        public string IncludedItems { get; set; }

        public string ExcludedItems { get; set; }

        public string AdditionalNotes { get; set; }
    }
}
