﻿namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateDocumentVersionDto
    {
        public Guid Id { get; set; }

        public ChangeType ChangeType { get; set; }

        public string Changes { get; set; }

        public string ChangeReason { get; set; }

        public Guid DocumentId { get; set; }
    }
}
