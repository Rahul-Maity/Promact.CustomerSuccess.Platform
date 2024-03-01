using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Acme.TestAbp.Data;
using Acme.TestAbp.Entities;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;


namespace Acme.TestAbp.Repositories
{
    public class ApprovedTeamRepository : EfCoreRepository<ApprovedTeamDbContext, ApprovedTeam, Guid>, IApprovedTeamRepository
    {
        public ApprovedTeamRepository(IDbContextProvider<ApprovedTeamDbContext> dbContextProvider) : base(dbContextProvider) { }

    }
}
