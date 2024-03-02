
using Promact.CustomerSuccess.Platform.Entities;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
namespace Acme.TestAbp.Repositories
{
    public interface IApprovedTeamRepository : IRepository<ApprovedTeam, Guid>
    {

    }
}
