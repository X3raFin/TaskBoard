using System.ComponentModel.DataAnnotations;


namespace TaskBoard.Serwer.Dtos;

public class RegisterDto
{
	[Required(ErrorMessage = "Login jest wymagany")]
	[MaxLength(15, ErrorMessage = "Login musi zawierac maksymalnie 15 znakow"), MinLength(5, ErrorMessage = "Login musi zawierac przynajmniej 5 znakow")]
	public string? Login { get; set; }

	[Required(ErrorMessage = "Hasło jest wymagane")]
	[MinLength(5, ErrorMessage = "Hasło musi mieć min. 5 znaków"), MaxLength(20, ErrorMessage = "Haslo moze miec maksymalnie 20 znakow")]
	[RegularExpression(@"^(?=.*\d)(?=.*[\W_])[A-Z].*$",
		ErrorMessage = "Hasło musi zaczynać się wielką literą, zawierać cyfrę i znak specjalny")]
	public string? Password { get; set; }

	[Required(ErrorMessage = "Email jest wymagany")]
	[EmailAddress(ErrorMessage = "Niepoprawny format adresu email")]
	public string? Email { get; set; }
}