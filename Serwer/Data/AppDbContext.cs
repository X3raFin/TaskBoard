using Microsoft.EntityFrameworkCore;
using TaskBoard.Serwer.Models;

namespace TaskBoard.Serwer.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<Board> Boards { get; set; }
		public DbSet<Column> Columns { get; set; }
		public DbSet<ToDo> ToDos { get; set; }
	}
}