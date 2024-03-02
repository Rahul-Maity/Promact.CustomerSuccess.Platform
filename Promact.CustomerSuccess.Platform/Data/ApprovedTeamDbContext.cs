
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Promact.CustomerSuccess.Platform.Entities;
namespace Promact.CustomerSuccess.Platform.Data
{
    [ReplaceDbContext(typeof(IIdentityProDbContext))]
    [ReplaceDbContext(typeof(ISaasDbContext))]
    [ConnectionStringName("Default")]
    public class ApprovedTeamDbContext :
        AbpDbContext<ApprovedTeamDbContext>,
        IIdentityProDbContext,
        ISaasDbContext


    {
        public DbSet<ApprovedTeam> ApprovedTeams{get; set;}
        public ApprovedTeamDbContext(DbContextOptions<ApprovedTeamDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ConfigurePermissionManagement();
            builder.Entity<ApprovedTeam>(b =>
            {
                b.ToTable("ApprovedTeams");
                b.ConfigureByConvention();
                b.Property(x => x.TeamName).IsRequired().HasMaxLength(128);
            });
        }
     

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    base.OnConfiguring(optionsBuilder);

        //}
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //modelBuilder.Entity<ApprovedTeam>(b =>
        //    {
        //        b.ToTable("ApprovedTeams");
        //        b.ConfigureByConvention();

        //    });
        //}

    }
}
