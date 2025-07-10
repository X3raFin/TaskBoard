using TaskBoard.Serwer.Models;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using Microsoft.VisualBasic;

namespace Serwer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TaskBoardController : ControllerBase
	{

		[HttpGet]
		public List<Board> GetBoards()
		{
			return InMemoryDataStore.Boards;
		}

		[HttpGet("columns/{BoardId}")]
		public Dictionary<string, List<ToDo>> GetColumns(int BoardId)
		{
			var columns = InMemoryDataStore.Columns.Where(col => col.BoardId == BoardId).OrderBy(col => col.Order).ToList();
			var answer = new Dictionary<string, List<ToDo>>();
			foreach (Column c in columns)
			{
				if (c.Name is not null)
					answer.Add(c.Name, InMemoryDataStore.ToDos.Where(t => t.ColumnId == c.Id).OrderBy(t => t.Order).ToList());
			}
			return answer;
		}
		[HttpPost]
		public IActionResult CreateBoard([FromBody] CreateBoardDto dto)
		{
			var LastBoard = InMemoryDataStore.Boards.LastOrDefault();
			if (dto is not null)
			{
				InMemoryDataStore.Boards.Add(new Board { Id = LastBoard.Id + 1, Name = dto.Name, ColsNumber = 0 });
				return StatusCode(201, "Nowa tablica została dodana pomyślnie.");
			}
			return BadRequest("Coś poszło nie tak.");
		}
	}
	public class CreateBoardDto
	{
		public string Name { get; set; }
	}
}
