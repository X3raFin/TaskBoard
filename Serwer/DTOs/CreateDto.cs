using TaskBoard.Serwer.Models;

namespace TaskBoard.Serwer.Dtos;

public class CreateDto
{
	public string? Name { get; set; }

	public int UserId { get; set; }
}