using System.Text.Json.Serialization;

namespace TaskBoard.Serwer.Models
{
	public class Column
	{
		public int Id { get; set; }
		public int BoardId { get; set; }
		public string? Name { get; set; }
		public int TasksNumber { get; set; } = 0;
		public int Order { get; set; }

		[JsonIgnore]
		public Board? Board { get; set; }
		public List<ToDo> Tasks { get; set; } = new List<ToDo>();
	}
}