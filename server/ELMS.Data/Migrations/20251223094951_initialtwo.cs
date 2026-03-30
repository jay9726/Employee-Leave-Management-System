using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class initialtwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_AspNetUsers_AppUserId",
                table: "LeaveRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_Departments_DepartmentId",
                table: "LeaveRequests");

            migrationBuilder.DropIndex(
                name: "IX_LeaveRequests_AppUserId",
                table: "LeaveRequests");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "LeaveRequests");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "3df15f03-ab44-4f74-8750-f3a216decbd7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "b27292e4-29fc-4046-a912-7ff263d056ce");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "dea9d579-f09a-4b7b-9f54-7eb5e80c7beb", "AQAAAAIAAYagAAAAEDw0K/2umS+idGNthsblZmxFkwJofTQqZYEXv6Cd1LdqFkOvxPw222rDjDjGFSxsBA==" });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_ApplicationId",
                table: "LeaveRequests",
                column: "ApplicationId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_AspNetUsers_ApplicationId",
                table: "LeaveRequests",
                column: "ApplicationId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_Departments_DepartmentId",
                table: "LeaveRequests",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "DepartmentId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_AspNetUsers_ApplicationId",
                table: "LeaveRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_Departments_DepartmentId",
                table: "LeaveRequests");

            migrationBuilder.DropIndex(
                name: "IX_LeaveRequests_ApplicationId",
                table: "LeaveRequests");

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "LeaveRequests",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "a253f85a-ce41-4055-aba7-452e6ad9f484");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "4d50e3ce-423e-46ad-ba6d-df29a1ebf4d0");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "294f332b-47b2-45d4-813e-92db4a9f9aff", "AQAAAAIAAYagAAAAENDgW8cTne9464cXqCfnaFmsx9SS6GPZra4A4N5RcUa9Xz3UKzV5XGljfAiu5dDXLQ==" });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_AppUserId",
                table: "LeaveRequests",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_AspNetUsers_AppUserId",
                table: "LeaveRequests",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_Departments_DepartmentId",
                table: "LeaveRequests",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "DepartmentId");
        }
    }
}
