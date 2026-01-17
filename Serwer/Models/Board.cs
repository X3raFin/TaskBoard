using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TaskBoard.Serwer.Models
{
	public class Board
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string? Name { get; set; }
		public int ColsNumber { get; set; } = 0;

		[JsonIgnore]
		public User? User { get; set; }
		public List<Column> Columns { get; set; } = new List<Column>();
	}
}