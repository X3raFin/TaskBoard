import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Columns {
  id: number;
  boardId: number;
  name: string;
  taskNumber: number;
  order: number;
}

function BoardPage() {
  const params = useParams();
  const [cols, setCols] = useState<Columns[]>([]);
  const url = "http://localhost:5112/api/TaskBoard/columns/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + params.BoardId);
        if (!response.ok) {
          console.error("Operacja nie dostała kodu 200.");
        }
        const json = await response.json();
        setCols(json);
      } catch (error) {
        console.error("Wystąpił problem: " + error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {cols.map((col) => {
        return (
          <div key={col.id}>
            <h3>{col.name}</h3>
          </div>
        );
      })}
    </>
  );
}

export default BoardPage;
