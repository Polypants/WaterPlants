using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WaterPlants.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Plant",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastWatered = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plant", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Plant",
                columns: new[] { "Id", "LastWatered" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 11, 22, 17, 50, 52, 283, DateTimeKind.Local).AddTicks(8873) },
                    { 2, new DateTime(2021, 11, 22, 17, 50, 52, 283, DateTimeKind.Local).AddTicks(8908) },
                    { 3, new DateTime(2021, 11, 22, 17, 50, 52, 283, DateTimeKind.Local).AddTicks(8911) },
                    { 4, new DateTime(2021, 11, 22, 17, 50, 52, 283, DateTimeKind.Local).AddTicks(8913) },
                    { 5, new DateTime(2021, 11, 22, 17, 50, 52, 283, DateTimeKind.Local).AddTicks(8915) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Plant");
        }
    }
}
