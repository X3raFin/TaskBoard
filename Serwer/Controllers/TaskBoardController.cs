using TaskBoard.Serwer.Models;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

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
		public Dictionary<string, List<ToDo>> GetColumns(int BoardId)
		{
			var columns = InMemoryDataStore.Columns.Where(col => col.BoardId == BoardId).OrderBy(col => col.Order).ToList();
			var answer = new Dictionary<string, List<ToDo>>();
			foreach (Column c in columns)
			{
				answer.Add(c.Name, InMemoryDataStore.ToDos.Where(t => t.ColumnId == c.Id).OrderBy(t => t.Order).ToList());
			}
			return answer;
		}
	}
}
