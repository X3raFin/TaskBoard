import React, { useEffect, useState } from "react";
import "../App.css"; // Upewnij się, że tu nie ma śmieci, tylko @import i @plugin
import { Link } from "react-router-dom";

interface Board {
  id: number;
  name: string;
  colsNumber: number;
}

function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const [newBoardName, setNewBoardName] = useState<string>("");

  const apiUrl = "http://localhost:5112/api/TaskBoard";

  const fetchedData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) return console.error("Błąd pobierania");
      const json = await response.json();
      setBoards(json);
    } catch (error) {
      return console.error("Błąd: " + error);
    }
  };

  const creatingFormHandler = async () => {
    if (!newBoardName) return; // Zabezpieczenie przed pustą nazwą
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: newBoardName }),
      });
      if (!response.ok) return console.error("Błąd zapisu");
      fetchedData(); // Odśwież listę
    } catch (error) {
      return console.error("Błąd: " + error);
    } finally {
      setNewBoardName("");
      setStatus(false);
    }
  };

  const changeNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(event.target.value);
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    // Kontener główny z paddingiem i Flexboxem (zastępuje #Boards)
    <div className="p-8 min-h-screen flex flex-wrap gap-6 items-start content-start">
      {/* 1. LISTA TABLIC */}
      {boards.map((board) => (
        <Link to={"/column/" + board.id} key={board.id}>
          {/* Karta zamiast div-a */}
          <div className="card w-72 bg-base-100 shadow-xl hover:scale-105 transition-transform cursor-pointer border border-base-content/10">
            <div className="card-body p-5">
              <h3 className="card-title text-primary">{board.name}</h3>
              <p className="text-sm opacity-70">Kolumn: {board.colsNumber}</p>
            </div>
          </div>
        </Link>
      ))}

      {/* 2. PRZYCISK DODAWANIA (Jako kafel) */}
      <button
        className="card w-72 h-32 border-2 border-dashed border-base-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors bg-transparent"
        onClick={() => setStatus(true)}
      >
        <span className="text-5xl">+</span>
      </button>

      {/* 3. MODAL (FORMULARZ) */}
      {status && (
        // To naprawia Twój #CreatingForm - teraz jest wyśrodkowany i na wierzchu
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="modal-box bg-base-100 shadow-2xl relative">
            {/* Krzyżyk do zamykania */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setStatus(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-4">Utwórz nową tablicę</h3>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nazwa</span>
              </label>
              <input
                type="text"
                placeholder="Np. Projekt X"
                className="input input-bordered w-full"
                value={newBoardName}
                onChange={changeNameValue}
                autoFocus // Żeby od razu pisać
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-primary" onClick={creatingFormHandler}>
                Stwórz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRZYCISK TESTOWY - MUSI MIEĆ KLASĘ 'btn' */}
      <div className="basis-full mt-10">
        <button className="btn btn-secondary">TERAZ MNIE WIDAĆ (TEST)</button>
      </div>
    </div>
  );
}

export default Dashboard;
