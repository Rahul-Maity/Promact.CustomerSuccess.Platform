using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class clientFeedback : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
       

            migrationBuilder.CreateTable(
                name: "ClientFeedbacks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    FeedbackType = table.Column<int>(type: "integer", nullable: false),
                    DateReceived = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DetailedFeedback = table.Column<string>(type: "text", nullable: false),
                    ActionTaken = table.Column<string>(type: "text", nullable: false),
                    ClosureDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientFeedbacks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientFeedbacks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientFeedbacks_ProjectId",
                table: "ClientFeedbacks",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.CreateTable(
                name: "ClientFeedbacks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    ActionTaken = table.Column<string>(type: "text", nullable: false),
                    ClosureDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    DateReceived = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DetailedFeedback = table.Column<string>(type: "text", nullable: false),
                    FeedbackType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientFeedbacks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientFeedbacks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientFeedbacks_ProjectId",
                table: "ClientFeedbacks",
                column: "ProjectId");
        }
    }
}
