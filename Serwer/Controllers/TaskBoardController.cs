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