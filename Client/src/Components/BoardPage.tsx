import { useEffect, useState } from "react";
import "../App.css";

function BoardPage() {
  const [boards, setBoards] = useState();

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

  return <h1>{boards}</h1>;
}

export default BoardPage;
