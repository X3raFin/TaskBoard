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

  const apiUrl = "http://localhost:5112/api/TaskBoard/boards";

  const creatingFormHandler = (name: string) => {
    if (status == false) return;
    console.log(name);
  };

  const changeNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(event.target.value);
  };

  useEffect(() => {
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
        <button id="submit" onClick={() => creatingFormHandler(newBoardName)}>
          Stwórz
        </button>
      </div>
    </div>
  );
}

export default BoardPage;
