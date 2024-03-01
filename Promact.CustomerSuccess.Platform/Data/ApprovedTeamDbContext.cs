using Acme.TestAbp.Entities;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Acme.TestAbp.Data
{
    public class ApprovedTeamDbContext : AbpDbContext<ApprovedTeamDbContext>
    {
        public DbSet<ApprovedTeam> ApprovedTeams => Set<ApprovedTeam>();
        public ApprovedTeamDbContext(DbContextOptions<ApprovedTeamDbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseNpgsql("Default");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApprovedTeam>(b =>
            {
                b.ToTable("ApprovedTeams");
                b.ConfigureByConvention();

            });
        }
    }
}
