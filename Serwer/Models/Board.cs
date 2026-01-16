using System.Collections.Generic;

namespace TaskBoard.Serwer.Models
{
	public class Board
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public int ColsNumber { get; set; } = 0;

		public List<Column> Columns { get; set; } = new List<Column>();
	}
}