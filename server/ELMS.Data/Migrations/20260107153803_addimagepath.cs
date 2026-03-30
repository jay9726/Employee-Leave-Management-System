using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class addimagepath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "142047ca-b68c-4093-a2a3-d71cbb761297");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "5125e552-edcf-45c5-b4e7-1466dbe9448e");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "ImagePath", "PasswordHash" },
                values: new object[] { "a23625ba-453c-40f4-8c80-cfde95a832fd", null, "AQAAAAIAAYagAAAAECM2jCJAAycJpPCrXwvjcFBk2+eiKWEnfb8+MLpFmL6pp+inmsHhsUtc2oCG50Qu7w==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "AspNetUsers");

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
    }
}
