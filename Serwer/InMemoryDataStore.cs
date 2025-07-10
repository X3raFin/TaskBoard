using TaskBoard.Serwer.Models;
public static class InMemoryDataStore
{
	public static List<Board> Boards { get; set; } = new List<Board>
	{
		new Board { Id = 1, Name = "Główna tablica", ColsNumber = 2, }

	};

	public static List<Column> Columns { get; set; } = new List<Column>
	{
		new Column { Id = 2, BoardId = 1, Name = "Podstawowa2", TasksNumber = 1, Order = 2 },
		new Column { Id = 1, BoardId = 1, Name = "Podstawowa", TasksNumber = 2, Order = 1 },
	};

	public static List<ToDo> ToDos { get; set; } = new List<ToDo>
	{
		new ToDo {Id = 1, ColumnId = 1, Name="Sprawdz poprawnosc", Descriptions = "Jakis randomowy tekst", Order = 1},
		new ToDo {Id = 2, ColumnId = 1, Name="Ten powinien wyswietlac sie nizej", Descriptions = "Jakis randomowy tekstnumer 2 zobaczymy czy zadziala", Order = 2},
		new ToDo {Id = 3, ColumnId = 2, Name="A ten ma sie wyswietlic w 2 kolumnie", Descriptions = "Jakis randomowy tekst jak poprzednio", Order = 1}
	};
}