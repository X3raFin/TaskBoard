# 📊 B-Productive (Kanban Board)

Mój pierwszy projekt **Full-Stack**, łączący warstwę serwerową z interfejsem klienta. Aplikacja typu Kanban służąca do organizacji zadań i zwiększania produktywności.

Główne założenia projektu:

- **Architektura Client-Server:** Oddzielny frontend i backend.
- **Pełny CRUD:** Tworzenie, odczyt, aktualizacja i usuwanie zadań oraz tablic.
- **Baza Danych:** Trwałe przechowywanie danych użytkowników, haseł i struktury zadań.
- **Uwierzytelnianie:** System rejestracji i logowania.

## 🌐 Live Demo

[Link do demo]("Wkrótce się pojawi.")

## ⚡ Interaktywny Dashboard (CRUD)

Pełna obsługa cyklu życia zadań bez przeładowania strony.

![CRUD Demo](./assets/CRUD.gif)

- **Tworzenie:** Błyskawiczne dodawanie nowych kart do kolumn.
- **Edycja Stanu:** Intuicyjne oznaczanie zadań jako wykonane (checkbox).
- **Usuwanie:** Trwałe usuwanie niechcianych elementów z bazy danych.

## 🛠 Stack Technologiczny

### Frontend (Client-Side)

- **React** (TypeScript + Vite) - nowoczesne środowisko SPA.
- **Tailwind CSS + daisyUI** - system stylów i gotowe komponenty.
- **Fetch API** - komunikacja z serwerem.
- **React Hot Toast** - system powiadomień.

### Backend (Server-Side)

- **ASP.NET Core Web API** (.NET 8) - REST API zwracające dane w formacie JSON.
- **Entity Framework Core** - ORM do obsługi bazy danych.
- **SQLite** - lekka, plikowa baza danych.
- **LINQ** - zapytania do danych.

### Architektura i Wzorce

- **Client-Server** - pełna separacja frontendu od backendu.
- **REST API** - bezstanowa architektura komunikacji.
- **Dependency Injection (DI)** - wbudowany w .NET kontener IoC.
- **DTO (Data Transfer Objects)** - bezpieczne przesyłanie danych między API a klientem.

## 🚀 Jak uruchomić projekt?

Wymagania: **Node.js** oraz **.NET 8 SDK**.

1. **Sklonuj repozytorium:**

   ```bash
   git clone [https://github.com/X3raFin/TaskBoard.git](https://github.com/X3raFin/TaskBoard.git)
   cd B-Productive
   ```

2. **Uruchom Server**

   ```bash
   cd Serwer
   dotnet restore
   dotnet ef database update
   dotnet run
   ```

3. **Uruchom Frontend**
   ```bash
   cd Client
   npm install
   npm run dev
   ```

## 📬 Kontakt

Autorem projektu jest **Kacper Jankowski**.

- 🌐 **LinkedIn:** [LinkedIn](https://www.linkedin.com/in/kacper-jankowski-webdev/)
- 📧 **Email:** kacper.jankowski.webdev@gmail.com
- 💼 **Portfolio:** [Portfolio](tbc)
