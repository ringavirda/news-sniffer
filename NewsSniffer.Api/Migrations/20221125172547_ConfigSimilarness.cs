using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsSniffer.Api.Migrations
{
    /// <inheritdoc />
    public partial class ConfigSimilarness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "CutoffRank",
                table: "TrainingConfigs",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<double>(
                name: "SimilarnessRank",
                table: "TrainingConfigs",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SimilarnessRank",
                table: "TrainingConfigs");

            migrationBuilder.AlterColumn<int>(
                name: "CutoffRank",
                table: "TrainingConfigs",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");
        }
    }
}
