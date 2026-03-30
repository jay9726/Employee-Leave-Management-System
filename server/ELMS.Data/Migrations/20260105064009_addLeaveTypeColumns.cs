using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class addLeaveTypeColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LeaveType",
                table: "LeaveRequests",
                type: "nvarchar(max)",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LeaveType",
                table: "LeaveRequests");

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
    }
}
