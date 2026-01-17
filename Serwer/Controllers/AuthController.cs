using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskBoard.Serwer.Data;
using TaskBoard.Serwer.Dtos;
using TaskBoard.Serwer.Models;

namespace TaskBoard.Serwer.Controller;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
	private readonly AppDbContext? _context;

	public AuthController(AppDbContext context)
	{
		_context = context;
	}

	[HttpPost("register")]
	public async Task<IActionResult> Register(RegisterDto dto)
	{
		var exist = await _context.Users.AnyAsync(u => u.Email == dto.Email);
		if (exist) return Conflict("Wyglada na to, ze uzytkownik o tym emailu jest juz zarejestrowany. Sprobuj sie zalogowac.");
		var user = new User
		{
			Login = dto.Login,
			PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
			Email = dto.Email
		};

		await _context.Users.AddAsync(user);
		await _context.SaveChangesAsync();

		return Ok("Rejestracja przebiegla pomyslnie");
	}

	[HttpPost("login")]
	public async Task<IActionResult> Login(LoginDto dto)
	{
		var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
		if (user == null) return BadRequest("Bledny email lub haslo");

		var password = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
		if (!password) return BadRequest("Bledny email lub haslo");

		user.PasswordHash = "";

		return Ok(user);
	}
}