import React, { useEffect, useState } from "react";
import "../App.css";
import { BoardCard } from "./BoardCard";

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
    if (!newBoardName) return;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: newBoardName }),
      });
      if (!response.ok) return console.error("Błąd zapisu");
      fetchedData();
    } catch (error) {
      return console.error("Błąd: " + error);
    } finally {
      setNewBoardName("");
      setStatus(false);
    }
  };

  const updateBoardNameHandler = async (boardId: number, newName: string) => {
    try {
      const response = await fetch(
        `${apiUrl}/columns/patchBoardName/${boardId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newName),
        }
      );

      if (!response.ok) {
        console.error("Błąd edycji");
        return;
      }
      fetchedData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBoardHandler = async (boardId: number) => {
    try {
      const response = await fetch(apiUrl + "deleteBoard" + boardId, {
        method: "DELETE",
      });
      if (response.ok) fetchedData();
    } catch (error) {
      return console.error("Błąd usuwania: " + error);
    }
  };

  const changeNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(event.target.value);
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <div className="p-8 min-h-screen flex flex-wrap gap-6 items-start content-start">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onUpdateName={updateBoardNameHandler}
          onDelete={deleteBoardHandler}
        />
      ))}

      <button
        className="card md:w-72 md:h-32 border-2 border-dashed border-base-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors bg-transparent cursor-pointer"
        onClick={() => setStatus(true)}
      >
        <span className="text-5xl">+</span>
      </button>

      {status && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="md:w-100 md:h-50 md:p-5 bg-base-100 shadow-lg shadow-primary relative">
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
                autoFocus
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
    </div>
  );
}

export default Dashboard;
