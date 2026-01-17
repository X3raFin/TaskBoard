using System.ComponentModel.DataAnnotations;

namespace TaskBoard.Serwer.Dtos;

public class LoginDto
{
	[Required(ErrorMessage = "Login jest wymagany")]
	public string? Email { get; set; }

	[Required(ErrorMessage = "Hasło jest wymagane")]
	public string? Password { get; set; }
}