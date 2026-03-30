using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class addholidaystable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "companyHolidays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Day = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HolidayType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_companyHolidays", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "7a1dcf9b-ae8a-4add-b39e-70d894fb052d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "cb2a5464-da82-46b0-ae38-f60f121ccc26");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "54093a40-1d85-490d-9458-6d402ccf45a2", "AQAAAAIAAYagAAAAEBclrhVObe8OzaHRlz+b+cw4M9RT9NAzruiy28EGB0LDvz9DjCUK+MQZkTAJXEhERA==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "companyHolidays");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "263f82a0-6ecc-43e4-9cf9-8ce725c280d2");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "eb330322-1908-40ef-ab8e-7d54ca592b23");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "6e7834db-d096-4276-a122-effab116ab44", "AQAAAAIAAYagAAAAEEe/udR7+iaca/bDgCf/mHetTM/8dOfnKPMPeD6OvCsgIFb/lZPg4EzMFT9ShfRNEA==" });
        }
    }
}
