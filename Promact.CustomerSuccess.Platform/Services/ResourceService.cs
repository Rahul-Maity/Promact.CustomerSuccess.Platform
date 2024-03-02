using Volo.Abp.Domain.Repositories;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ResourceService:
    
        CrudAppService<
       Resource,
       ResourcesDtos,
       Guid,
       PagedAndSortedResultRequestDto,
       CreateResourcesDtos,
       UpdateResourcesDtos
       >,
        IResourceService
{
    public ResourceService(IRepository<Resource, Guid> repository)
        : base(repository)
        {

        }
    }
}
