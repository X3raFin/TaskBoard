import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

interface Board {
  id: number;
  name: string;
  colsNumber: number;
}

function BoardPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const [newBoardName, setNewBoardName] = useState<string>("");

  const apiUrl = "http://localhost:5112/api/TaskBoard";

  const fetchedData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return console.error("Prośba http nie uzyskała kodu 200.");
      }
      const json = await response.json();
      setBoards(json);
    } catch (error) {
      return console.error("Prośba zakończona niepowodzeniem: " + error);
    }
  };

  const creatingFormHandler = async () => {
    if (status === false) return;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: newBoardName }),
      });
      if (!response.ok)
        return console.error("Operacja nie zakończyła się kodem 200.");
    } catch (error) {
      return console.error("Coś poszło nie tak: " + error);
    } finally {
      setNewBoardName("");
      setStatus(false);
      fetchedData();
    }
  };

  const changeNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(event.target.value);
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <div id="Boards">
      {boards.map((board) => {
        return (
          <Link to={"/column/" + board.id} key={board.id}>
            <div className="Board">
              <h3>Nazwa Tablicy: {board.name}</h3>
              <h4>Liczba kolumn: {board.colsNumber}</h4>
            </div>
          </Link>
        );
      })}
      <button onClick={() => setStatus(!status)}>+</button>
      <div
        id="CreatingForm"
        style={{ display: status === false ? "none" : "flex" }}
      >
        <button id="Exit" onClick={() => setStatus(false)}>
          X
        </button>
        Nazwa nowej tablicy:
        <input
          type="text"
          id="Nazwa"
          value={newBoardName}
          onChange={changeNameValue}
        />
        <button id="submit" onClick={() => creatingFormHandler()}>
          Stwórz
        </button>
      </div>
    </div>
  );
}

export default BoardPage;
