using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class removeotptable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OTPs");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "06960c8e-a2e6-4887-84dd-a980558ec6ec");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "0a8d4494-d18a-4b0f-966f-7ced5a76c37d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "fb976971-37d5-4da2-b2e4-db7c404494f9", "AQAAAAIAAYagAAAAEHnZjis8vF36HxJbm2nKlF6XRlMGNn9Llh0FCWyB5PL8ro3nV2DaGkBFMCcEtXRCqw==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OTPs",
                columns: table => new
                {
                    OTPId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppUserId = table.Column<int>(type: "int", nullable: true),
                    ExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    OTPCode = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OTPs", x => x.OTPId);
                    table.ForeignKey(
                        name: "FK_OTPs_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "a57791a9-ef5f-41db-9b30-1ff028d106c5");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "c1c072e1-347b-43a6-a0cd-8ebe57e8af37");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "1aa8fa9c-ea31-49ed-94b2-e9daa63498da", "AQAAAAIAAYagAAAAEFrQU7XU5w/3S3ieaY8Crj+gnjgnToaK1qFg2MEZf0d2/L26CXNiPMph8F8dvgDG3Q==" });

            migrationBuilder.CreateIndex(
                name: "IX_OTPs_AppUserId",
                table: "OTPs",
                column: "AppUserId");
        }
    }
}
