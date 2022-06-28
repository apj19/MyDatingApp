using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class newty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MyPhotos_Users_PhotoId",
                table: "MyPhotos");

            migrationBuilder.DropIndex(
                name: "IX_MyPhotos_PhotoId",
                table: "MyPhotos");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "MyPhotos");

            migrationBuilder.CreateIndex(
                name: "IX_Users_PhotoId",
                table: "Users",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_MyPhotos_PhotoId",
                table: "Users",
                column: "PhotoId",
                principalTable: "MyPhotos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_MyPhotos_PhotoId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_PhotoId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "MyPhotos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MyPhotos_PhotoId",
                table: "MyPhotos",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_MyPhotos_Users_PhotoId",
                table: "MyPhotos",
                column: "PhotoId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
