import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import Card from "./Card";

export interface ToDos {
  id: number;
  columnId: number;
  name: string;
  descriptions: string;
  order: number;
}

export type ColumnsStuff = Record<string, ToDos[]>;

function BoardPage() {
  const params = useParams();
  const [status, setStatus] = useState<boolean>(false);
  const [newColumnName, setNewColumnName] = useState<string>("");
  const [cols, setCols] = useState<ColumnsStuff>({});
  const [creatingNewTask, setCreatingNewTask] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const url = "http://localhost:5112/api/TaskBoard/columns/";

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

  const creatingFormHandler = async () => {
    try {
      const response = await fetch(url + params.BoardId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: newColumnName }),
      });
      if (!response.ok) {
        return console.error("Prośba nie została zakończona kodem 200.");
      } else fetchData();
    } catch (error) {
      console.error("Wystąpił problem: " + error);
    } finally {
      setStatus(false);
      setNewColumnName("");
    }
  };

  const creatingTaskFormHandler = async (columnId: number) => {
    try {
      const response = await fetch("http://localhost:5112/api/TaskBoard/task", {
        method: "POST",
        headers: {
          "Contnent-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
    } catch (error) {
      return console.error(`Coś poszło nie tak: ` + error);
    } finally {
      setCreatingNewTask(false);
      setNewColumnName("");
    }
  };

  const changeNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
  };

  const changeDescriptionValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card
      cols={cols}
      status={status}
      creatingNewTask={creatingNewTask}
      setCreatingNewTask={setCreatingNewTask}
      newColumnName={newColumnName}
      setStatus={setStatus}
      changeNameValue={changeNameValue}
      creatingFormHandler={creatingFormHandler}
    />
  );
}

export default BoardPage;
