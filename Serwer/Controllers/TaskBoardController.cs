using TaskBoard.Serwer.Models;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Serwer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TaskBoardController : ControllerBase
	{

		[HttpGet("boards")]
		public List<Board> GetBoards()
		{
			return InMemoryDataStore.Boards;
		}

		[HttpGet("columns/{BoardId}")]
		public List<Column> GetColumns(int BoardId)
		{
			var answer = new List<Column>();
			foreach (Column column in InMemoryDataStore.Columns)
			{
				if (column.BoardId == BoardId)
					answer.Add(column);
			}
			var sortedAnswer = answer.OrderBy(ans => ans.Order).ToList();
			return sortedAnswer;
		}

		[HttpGet("todos")]
		public List<ToDo> GetToDos()
		{
			return InMemoryDataStore.ToDos;
		}
	}
}
