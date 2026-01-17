using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoard.Serwer.Data;
using TaskBoard.Serwer.Models;
using TaskBoard.Serwer.Dtos;

namespace TaskBoard.Serwer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TaskBoardController : ControllerBase
	{
		private readonly AppDbContext _context;

		public TaskBoardController(AppDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<IActionResult> GetBoards()
		{
			var boards = await _context.Boards.ToListAsync();
			return Ok(boards);
		}

		[HttpGet("columns/{BoardId}")]
		public async Task<IActionResult> GetColumns(int BoardId)
		{
			var columns = await _context.Columns.Where(c => c.BoardId == BoardId).OrderBy(c => c.Order).Include(c => c.Tasks.OrderBy(t => t.Order)).ToListAsync();

			return Ok(columns);
		}

		[HttpPost]
		public async Task<IActionResult> CreateBoard([FromBody] CreateDto dto)
		{
			var exist = await _context.Boards.AnyAsync(b => b.Name == dto.Name);

			if (exist) return Conflict("Tablica o takiej nazwie juz istnieje.");

			var board = new Board
			{
				Name = dto.Name
			};

			await _context.Boards.AddAsync(board);

			await _context.SaveChangesAsync();

			return Ok(board);
		}

		[HttpPost("columns/{BoardId}")]
		public async Task<IActionResult> CreateColumn(int BoardId, [FromBody] CreateDto dto)
		{
			var exist = await _context.Columns.AnyAsync(c => c.Name == dto.Name && c.BoardId == BoardId);

			if (exist) return Conflict("Kolumna o podanej nazwie juz istnieje.");

			var newColumnOrder = (await _context.Columns.Where(c => c.BoardId == BoardId).MaxAsync(c => (int?)c.Order) ?? 0) + 1;

			var column = new Column
			{
				BoardId = BoardId,
				Name = dto.Name,
				Order = newColumnOrder,
			};
			await _context.Columns.AddAsync(column);

			await _context.SaveChangesAsync();

			return Ok(column);
		}

		[HttpPost("task")]
		public async Task<IActionResult> CreateToDo([FromBody] NewTaskDto dto)
		{
			var exist = await _context.ToDos.AnyAsync(t => t.Name == dto.Name && t.ColumnId == dto.Id);
			if (exist) return Conflict("Zadanie o takiej nazwie juz istnieje.");

			var newTaskOrder = (await _context.ToDos.Where(t => t.ColumnId == dto.Id).MaxAsync(t => (int?)t.Order) ?? 0) + 1;

			var task = new ToDo
			{
				ColumnId = dto.Id,
				Name = dto.Name,
				Descriptions = dto.Descriptions,
				Order = newTaskOrder
			};

			await _context.ToDos.AddAsync(task);
			await _context.SaveChangesAsync();
			return Ok(task);
		}

		[HttpDelete("columns/deleteTask/{taskId}")]
		public async Task<IActionResult> DeleteTask(int taskId)
		{
			var task = await _context.ToDos.FindAsync(taskId);
			if (task == null) return NotFound("Nie ma takiego zadania.");

			_context.ToDos.Remove(task);
			await _context.SaveChangesAsync();

			return Ok();
		}

		[HttpDelete("columns/deleteColumn/{columnId}")]
		public async Task<IActionResult> DeleteColumn(int columnId)
		{
			var column = await _context.Columns.FindAsync(columnId);
			if (column == null) return NotFound("Nie ma takiej kolumny.");

			_context.Columns.Remove(column);
			await _context.SaveChangesAsync();

			return Ok();
		}

		[HttpDelete("deleteBoard/{boardId}")]
		public async Task<IActionResult> DeleteBoard(int boardId)
		{
			var board = await _context.Boards.FindAsync(boardId);
			if (board == null) return NotFound("Nie ma takiej tablicy.");

			_context.Boards.Remove(board);
			await _context.SaveChangesAsync();

			return Ok();
		}

		[HttpPatch("columns/patchTaskName/{taskId}")]
		public async Task<IActionResult> ChangeTaskName(int taskId, [FromBody] string newName)
		{
			var task = await _context.ToDos.FindAsync(taskId);
			if (task == null) return NotFound("Nie znaleziono takiego zadania.");

			task.Name = newName;

			await _context.SaveChangesAsync();
			return Ok();
		}

		[HttpPatch("columns/patchTaskStatus/{taskId}")]
		public async Task<IActionResult> ChangeTaskStatus(int taskId)
		{
			var task = await _context.ToDos.FindAsync(taskId);
			if (task == null) return NotFound("Nie znaleziono takiego zadania.");

			task.isDone = !task.isDone;

			await _context.SaveChangesAsync();
			return Ok();
		}

		[HttpPatch("columns/patchTaskDescription/{taskId}")]
		public async Task<IActionResult> ChangeTaskDescription(int taskId, [FromBody] string newDescription)
		{
			var task = await _context.ToDos.FindAsync(taskId);
			if (task == null) return NotFound("Nie znaleziono takiego zadania.");

			task.Descriptions = newDescription;

			await _context.SaveChangesAsync();
			return Ok();
		}

		[HttpPatch("columns/patchColumnName/{columnId}")]
		public async Task<IActionResult> ChangeColumnName(int columnId, [FromBody] string newName)
		{
			var column = await _context.Columns.FindAsync(columnId);
			if (column == null) return NotFound("Nie znaleziono takiej kolumny.");

			column.Name = newName;

			await _context.SaveChangesAsync();
			return Ok();
		}

		[HttpPatch("columns/patchBoardName/{boardId}")]
		public async Task<IActionResult> ChangeBoardName(int boardId, [FromBody] string newName)
		{
			var board = await _context.Boards.FindAsync(boardId);
			if (board == null) return NotFound("Nie znaleziono takiej tablicy.");

			board.Name = newName;

			await _context.SaveChangesAsync();
			return Ok();
		}
	}
}