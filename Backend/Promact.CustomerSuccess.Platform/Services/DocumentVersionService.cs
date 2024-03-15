
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class DocumentVersionService:

        CrudAppService<DocumentVersion,
            DocumentVersionDto,

            Guid,
            PagedAndSortedResultRequestDto,
            CreateDocumentVersionDto,
            UpdateDocumentVersionDto
           >,
        IDocumentVersionService
    {
        public DocumentVersionService(IRepository<DocumentVersion, Guid> DocumentVersionRepository) :
            base(DocumentVersionRepository)
        {
        }
    }
}
