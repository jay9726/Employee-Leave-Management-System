using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class addholidattable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "f2812713-a830-463b-ac54-a85d7998e141");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "f026d335-af6a-4a4d-b2da-7242766bb849");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ba1436d4-6a47-409e-8633-1a05585987ba", "AQAAAAIAAYagAAAAEKGuQlRsSulMjSAaU1fK78CHKuNgstfF/N+41rTmPNAXCN+CcIJcOxftt7kALY0KUQ==" });
        }
    }
}
