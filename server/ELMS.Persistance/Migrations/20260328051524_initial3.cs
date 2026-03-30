using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELMS.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class initial3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
                column: "ConcurrencyStamp",
                value: "d3d5f536-5bfb-4907-9c21-7a26a6b0e7f2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
                column: "ConcurrencyStamp",
                value: "f6f1a624-6dc0-448a-8333-8772d99a5d12");
        }
    }
}
