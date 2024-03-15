using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectBudgetService:
        CrudAppService<
            ProjectBudget,
            ProjectBudgetDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateProjectBudgetDto,
            UpdateProjectBudgetDto>, 
        IProjectBudgetService
    {
        public ProjectBudgetService(IRepository<ProjectBudget, Guid> repository)
            : base(repository)
    {
       
    }

   
}
}
