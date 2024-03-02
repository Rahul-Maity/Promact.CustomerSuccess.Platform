using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class Resource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_ProjectBudgets_BudgetId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_BudgetId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "BudgetId",
                table: "Projects");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "ProjectBudgets",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Resource",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ResourceName = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resource", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBudgets_ProjectId",
                table: "ProjectBudgets",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId",
                table: "ProjectBudgets",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId",
                table: "ProjectBudgets");

            migrationBuilder.DropTable(
                name: "Resource");

            migrationBuilder.DropIndex(
                name: "IX_ProjectBudgets_ProjectId",
                table: "ProjectBudgets");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "ProjectBudgets");

            migrationBuilder.AddColumn<Guid>(
                name: "BudgetId",
                table: "Projects",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_BudgetId",
                table: "Projects",
                column: "BudgetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_ProjectBudgets_BudgetId",
                table: "Projects",
                column: "BudgetId",
                principalTable: "ProjectBudgets",
                principalColumn: "Id");
        }
    }
}
