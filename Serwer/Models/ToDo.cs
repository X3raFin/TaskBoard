namespace TaskBoard.Serwer.Models
{
	public class ToDo
	{
		public int Id { get; set; }
		public int ColumnId { get; set; }
		public string? Name { get; set; }
		public string? Descriptions { get; set; }
		public int Order { get; set; }
		public bool isDone { get; set; } = false;
	}
}