using System.Text.Json.Serialization;

namespace TaskBoard.Serwer.Models;

public class User
{
	public int Id { get; set; }
	public string? Login { get; set; }
	public string? PasswordHash { get; set; }
	public string? Email { get; set; }
	[JsonIgnore]
	public List<Board> Boards { get; set; } = new List<Board>();
}