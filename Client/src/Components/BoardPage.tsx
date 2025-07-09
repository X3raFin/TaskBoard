import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

interface ToDos {
  id: number;
  columnId: number;
  name: string;
  descriptions: string;
  order: number;
}

type ColumnsStuff = Record<string, ToDos[]>;

function BoardPage() {
  const params = useParams();
  const [cols, setCols] = useState<ColumnsStuff>({});
  const url = "http://localhost:5112/api/TaskBoard/columns/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + params.BoardId);
        if (!response.ok) {
          console.error("Operacja nie dostała kodu 200.");
        }
        const json: ColumnsStuff = await response.json();
        setCols(json);
      } catch (error) {
        console.error("Wystąpił problem: " + error);
      }
    };

    fetchData();
  }, []);
  console.log(cols);

  return (
    <div id="Columns">
      {Object.keys(cols).map((columnName) => {
        return (
          <div className="Column" key={columnName}>
            <h3>{columnName}</h3>
            {cols[columnName].map((t) => {
              return (
                <div key={t.id} className="Task">
                  <h4>{t.name}</h4>
                  <p>{t.descriptions}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default BoardPage;
