using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectResourcesService :
        CrudAppService<ProjectResources,
            ProjectResourcesDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateProjectResourcesDto,
            UpdateProjectResourcesDto>,
        IProjectResourcesService
    {
        public ProjectResourcesService(IRepository<ProjectResources, Guid> ProjectResourcesRepository) :
            base(ProjectResourcesRepository)
        {
        }
    }
}

