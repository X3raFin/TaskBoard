import React, { useEffect, useState } from "react";
import "../App.css";
import { BoardCard } from "./BoardCard";
import toast, { Toaster } from "react-hot-toast";

interface Board {
  id: number;
  name: string;
  colsNumber: number;
}

function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const [newBoardName, setNewBoardName] = useState<string>("");
  const [validationError, setValidationError] = useState<boolean>(false);

  const apiUrl = "http://localhost:5112/api/TaskBoard";

  const fetchedData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Błąd pobierania");
      const json = await response.json();
      setBoards(json);
    } catch (error) {
      toast.error("Nie udało się pobrać tablic.");
    }
  };

  const creatingFormHandler = async () => {
    if (!newBoardName.trim()) {
      setValidationError(true);
      toast.error("Nazwa nie może być pusta!");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: newBoardName }),
      });

      if (!response.ok) throw new Error("Błąd zapisu");

      fetchedData();
      toast.success("Dodano nową tablicę!");

      setNewBoardName("");
      setStatus(false);
      setValidationError(false);
    } catch (error) {
      toast.error("Wystąpił błąd podczas tworzenia.");
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

      if (!response.ok) throw new Error("Błąd edycji");
      fetchedData();
    } catch (error) {
      toast.error("Nie udało się zmienić nazwy.");
    }
  };

  const deleteBoardHandler = async (boardId: number) => {
    try {
      const response = await fetch(`${apiUrl}/deleteBoard/${boardId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchedData();
        toast.success("Tablica usunięta.");
      } else {
        throw new Error("Błąd usuwania");
      }
    } catch (error) {
      toast.error("Nie udało się usunąć tablicy.");
    }
  };

  const changeNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(event.target.value);
    if (validationError) setValidationError(false);
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <div className="p-8 min-h-screen flex flex-wrap gap-6 items-start content-start">
      <Toaster position="top-center" reverseOrder={false} />

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
              onClick={() => {
                setStatus(false);
                setValidationError(false);
              }}
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
                className={`input input-bordered w-full ${
                  validationError ? "input-error" : ""
                }`}
                value={newBoardName}
                onChange={changeNameValue}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") creatingFormHandler();
                }}
              />
              {validationError && (
                <span className="text-error text-sm mt-1">
                  Nazwa jest wymagana!
                </span>
              )}
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
