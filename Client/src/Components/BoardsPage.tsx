import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

interface Board {
  id: number;
  name: string;
  colsNumber: number;
}

function BoardPage() {
  const [boards, setBoards] = useState<Board[]>([]);

  const apiUrl = "http://localhost:5112/api/TaskBoard/boards";

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
    <div itemID="Boards">
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
    </div>
  );
}

export default BoardPage;
