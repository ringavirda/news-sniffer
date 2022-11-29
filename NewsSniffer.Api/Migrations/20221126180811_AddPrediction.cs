using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsSniffer.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPrediction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainingConfigs");

            migrationBuilder.AddColumn<string>(
                name: "Prediction",
                table: "Articles",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Prediction",
                table: "Articles");

            migrationBuilder.CreateTable(
                name: "TrainingConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CutoffRank = table.Column<double>(type: "REAL", nullable: false),
                    ExclusionList = table.Column<string>(type: "TEXT", nullable: false),
                    SimilarnessRank = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingConfigs", x => x.Id);
                });
        }
    }
}
