using AutoMapper.Internal.Mappers;
using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Volo.Abp.Domain.Repositories;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectUpdateService:
        CrudAppService<
            ProjectUpdate,            
            ProjectUpdateDto,         
            Guid,                        
            PagedAndSortedResultRequestDto,
            CreateProjectUpdateDto,       
            UpdateProjectUpdateDto>,     
        IProjectUpdateService          
    {
        public ProjectUpdateService(IRepository<ProjectUpdate, Guid> projectUpdateRepository)
            : base(projectUpdateRepository)
    {
       
    }
}
}
