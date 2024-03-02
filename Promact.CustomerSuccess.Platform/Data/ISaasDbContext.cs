
using Microsoft.EntityFrameworkCore;
using Promact.CustomerSuccess.Platform.Entities;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace Promact.CustomerSuccess.Platform.Data
{

    [ConnectionStringName("Default")]
    internal interface ISaasDbContext:IEfCoreDbContext
    {
        DbSet<ApprovedTeam> ApprovedTeams {  get; set; }
    
 


    }
}