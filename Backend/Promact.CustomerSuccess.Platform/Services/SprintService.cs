using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class SprintService :
         CrudAppService<
             Sprint,                // The entity type
             SprintDto,            // DTO used for client requests and responses
             Guid,                        // Primary key type (in this case, Guid)
             PagedAndSortedResultRequestDto, // Used for pagination and sorting
             CreateSprintDto,      // DTO used for creating entities
             UpdateSprintDto>,     // DTO used for updating entities
         ISprintService           // The contract interface
    {
        public SprintService(IRepository<Sprint, Guid> SprintRepository)
            : base(SprintRepository)
        {

        }
    }
}
