using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
namespace Promact.CustomerSuccess.Platform.Services
{
    public class ScopeService :
         CrudAppService<
             Scope,                // The entity type
             ScopeDto,            // DTO used for client requests and responses
             Guid,                        // Primary key type (in this case, Guid)
             PagedAndSortedResultRequestDto, // Used for pagination and sorting
             CreateScopeDto,      // DTO used for creating entities
             UpdateScopeDto>,     // DTO used for updating entities
         IScopeService            // The contract interface
    {
        public ScopeService(IRepository<Scope, Guid> ScopeRepository)
            : base(ScopeRepository)
        {

        }
    }
}
