using TaskBoard.Serwer.Models;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using Microsoft.VisualBasic;
using System.Data.Common;

namespace Serwer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TaskBoardController : ControllerBase
	{

		[HttpGet]
		public List<NewBoardDto> GetBoards()
		{
			var answer = InMemoryDataStore.Boards.Select(board => new NewBoardDto
			{
				Id = board.Id,
				Name = board.Name,
				ColsNumber = InMemoryDataStore.Columns.Count(col => col.BoardId == board.Id),
			}).ToList();
			return answer;
		}

		[HttpGet("/columns")]
		public List<Column> GetColumns()
		{
			return InMemoryDataStore.Columns;
		}

		[HttpGet("columns/{BoardId}")]
		public IActionResult GetColumns(int BoardId)
		{
			var columns = InMemoryDataStore.Columns.Where(col => col.BoardId == BoardId).OrderBy(col => col.Order).ToList();
			var response = columns.Select(c => new
			{
				Id = c.Id,
				Name = c.Name,
				Tasks = InMemoryDataStore.ToDos.Where(t => t.ColumnId == c.Id).OrderBy(t => t.Order).ToList()
			}).ToList();

			return Ok(response);
		}

		[HttpPost]
		public IActionResult CreateBoard([FromBody] CreateDto dto)
		{
			var LastBoard = InMemoryDataStore.Boards.LastOrDefault();
			if (dto is not null && LastBoard is not null)
			{
				InMemoryDataStore.Boards.Add(new Board { Id = LastBoard.Id + 1, Name = dto.Name });
				return StatusCode(201, "Nowa tablica została dodana pomyślnie.");
			}

			return BadRequest("Coś poszło nie tak.");
		}



		[HttpPost("columns/{BoardId}")]
		public IActionResult CreateColumn(int BoardId, [FromBody] CreateDto dto)
		{
			var LastColumn = InMemoryDataStore.Columns.LastOrDefault();
			if (dto is not null && LastColumn is not null)
			{
				InMemoryDataStore.Columns.Add(new Column { Id = LastColumn.Id + 1, BoardId = BoardId, Name = dto.Name, TasksNumber = 0, Order = LastColumn.Order + 1 });
				return StatusCode(201, "Nowa kolumna została pomyślnie dodana.");
			}

			return BadRequest("Coś poszło nie tak.");
		}

		[HttpPost("task")]
		public IActionResult CreateToDo([FromBody] NewTaskDto dto)
		{
			var LastTask = InMemoryDataStore.ToDos.LastOrDefault();
			var HighestOrderExist = InMemoryDataStore.ToDos.Where(t => t.ColumnId == dto.Id).Max(t => t.Order);
			if (dto.Id != 0 && dto.Name is not null && LastTask is not null)
			{
				InMemoryDataStore.ToDos.Add(new ToDo { Id = LastTask.Id + 1, ColumnId = dto.Id, Name = dto.Name, Descriptions = dto.Descriptions, Order = HighestOrderExist + 1 });
				return StatusCode(201, "Nowe zadanie zostało pomyślnie dodane");
			}

			return BadRequest("Coś poszło nie tak.");
		}

		[HttpDelete("columns/deleteTask/{taskId}")]
		public IActionResult DeleteTask(int taskId)
		{
			var TaskToRemove = InMemoryDataStore.ToDos.FirstOrDefault(t => t.Id == taskId);

			if (TaskToRemove == null) return StatusCode(404, "Coś poszło nie tak. Nie znaleziono takiego zadania.");

			InMemoryDataStore.ToDos.Remove(TaskToRemove);
			return StatusCode(200, "Zadanie zostało usunięte.");
		}

		[HttpDelete("columns/deleteColumn/{columnId}")]
		public IActionResult DeleteColumn(int columnId)
		{
			var ColumnToDelete = InMemoryDataStore.Columns.FirstOrDefault(c => c.Id == columnId);
			if (ColumnToDelete == null) return StatusCode(404, "Coś poszło nie tak nie znalazłem takiej kolumny.");

			InMemoryDataStore.ToDos.RemoveAll(t => t.ColumnId == columnId);

			InMemoryDataStore.Columns.Remove(ColumnToDelete);

			return StatusCode(200, "Kolumna została usunięta z całą jej zawartością.");
		}

		[HttpDelete("deleteBoard/{boardId}")]
		public IActionResult DeleteBoard(int boardId)
		{
			var BoardToDelete = InMemoryDataStore.Boards.FirstOrDefault(b => b.Id == boardId);
			if (BoardToDelete == null) return StatusCode(404, "Coś poszło nie tak. Nie znalazłem takiej tablicy.");

			var IdsColumnsToDelete = InMemoryDataStore.Columns.Where(c => c.BoardId == boardId).Select(c => c.Id).ToList();

			foreach (int IdColumn in IdsColumnsToDelete)
				InMemoryDataStore.ToDos.RemoveAll(t => t.ColumnId == IdColumn);

			InMemoryDataStore.Columns.RemoveAll(c => c.BoardId == boardId);

			InMemoryDataStore.Boards.Remove(BoardToDelete);

			return StatusCode(200, "Pomyślnie usunięto tablice");
		}

		[HttpPatch("columns/patchTaskName/{taskId}")]
		public IActionResult ChangeTaskName(int taskId, [FromBody] string newName)
		{
			var TaskToChange = InMemoryDataStore.ToDos.FirstOrDefault(t => t.Id == taskId);
			if (TaskToChange == null) return StatusCode(404, "Cos poszlo nie tak. Nie znalazlem takiego zadania");

			TaskToChange.Name = newName;

			return StatusCode(200, "Pomyslnie zmienilem nazwe zadania.");
		}

		[HttpPatch("columns/patchTaskStatus/{taskId}")]
		public IActionResult ChangeTaskStatus(int taskId)
		{
			var TaskToChange = InMemoryDataStore.ToDos.FirstOrDefault(t => t.Id == taskId);
			if (TaskToChange == null) return StatusCode(404, "Cos poszlo nie tak. Nie znalazlem takiego zadania");

			TaskToChange.isDone = !(TaskToChange.isDone);

			return StatusCode(200, "Pomyslnie zmienilem status zadania.");
		}

		[HttpPatch("columns/patchTaskDescription/{taskId}")]
		public IActionResult ChangeTaskDescription(int taskId, [FromBody] string newDescription)
		{
			var TaskToChange = InMemoryDataStore.ToDos.FirstOrDefault(t => t.Id == taskId);
			if (TaskToChange == null) return StatusCode(404, "Cos poszlo nie tak. Nie znalazlem takiego zadania");

			TaskToChange.Descriptions = newDescription;

			return StatusCode(200, "Pomyslnie zmienilem opis zadania.");
		}

		[HttpPatch("columns/patchColumnName/{columnId}")]
		public IActionResult ChangeColumnName(int columnId, [FromBody] string newName)
		{
			var ColumnToChange = InMemoryDataStore.Columns.FirstOrDefault(c => c.Id == columnId);
			if (ColumnToChange == null) return StatusCode(404, "Cos poszlo nie tak. Nie znalazlem takiej kolumy");

			ColumnToChange.Name = newName;

			return StatusCode(200, "Pomyslnie zmienilem nazwe kolumny.");
		}

		[HttpPatch("columns/patchBoardName/{boardId}")]
		public IActionResult ChangeBoardName(int boardId, [FromBody] string newName)
		{
			var BoardToChange = InMemoryDataStore.Boards.FirstOrDefault(b => b.Id == boardId);
			if (BoardToChange == null) return StatusCode(404, "Cos poszlo nie tak. Nie znalazlem takiej tablicy");

			BoardToChange.Name = newName;

			return StatusCode(200, "Pomyslnie zmienilem nazwe tablicy.");
		}


	}

	public class CreateDto
	{
		public string? Name { get; set; }
	}

	public class NewBoardDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public int ColsNumber { get; set; }
	}

	public class NewTaskDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? Descriptions { get; set; }
	}
}