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
  isDone: boolean;
}

export interface ColumnStuff {
  name: string;
  id: number;
  tasks: ToDos[];
}

function BoardPage() {
  const params = useParams();
  const [status, setStatus] = useState<boolean>(false);
  const [newColumnName, setNewColumnName] = useState<string>("");
  const [cols, setCols] = useState<ColumnStuff[]>([]);

  const url = "http://localhost:5112/api/TaskBoard/columns/";

  const fetchData = async () => {
    try {
      const response = await fetch(url + params.BoardId);
      if (!response.ok) {
        console.error("Operacja nie dostała kodu 200.");
      }
      const json: ColumnStuff[] = await response.json();
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

  const creatingTaskFormHandler = async (
    columnId: number,
    name: string,
    descriptions: string
  ) => {
    try {
      const response = await fetch("http://localhost:5112/api/TaskBoard/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: columnId,
          name: name,
          descriptions: descriptions,
        }),
      });
      if (response.ok) fetchData();
    } catch (error) {
      return console.error(`Coś poszło nie tak: ` + error);
    }
  };

  const toggleTaskStatus = async (id: number) => {
    try {
      const response = await fetch(url + "patchTaskStatus/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) fetchData();
    } catch (error) {
      return console.error(`Coś poszło nie tak: ` + error);
    }
  };

  const updateColumnName = async (id: number, name: string) => {
    try {
      const response = await fetch(url + "patchColumnName/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });
      if (response.ok) fetchData();
    } catch (error) {
      return console.error(`Coś poszło nie tak: ` + error);
    }
  };

  const updateTaskName = async (id: number, name: string) => {
    try {
      const response = await fetch(url + "patchTaskName/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });
      if (response.ok) fetchData();
    } catch (error) {
      return console.error(`Coś poszło nie tak: ` + error);
    }
  };

  const updateTaskDescription = async (id: number, desc: string) => {
    try {
      const response = await fetch(url + "patchTaskDescription/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(desc),
      });
      if (response.ok) fetchData();
    } catch (error) {
      return console.error(`Coś poszło nie tak: ` + error);
    }
  };

  const deleteColumn = async (id: number) => {
    try {
      const response = await fetch(url + "deleteColumn/" + id, {
        method: "DELETE",
      });
      if (response.ok) fetchData();
    } catch (error) {
      return console.error(`Coś poszło nie tak: ` + error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(
        url+ "deleteTask/" + id,
        {
          method: "DELETE",
        }
      );
      if (response.ok) fetchData();
    } catch (error) {
      return console.error(`Coś poszło nie tak: ` + error);
    }
  };

  const changeNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card
      cols={cols}
      status={status}
      newColumnName={newColumnName}
      setStatus={setStatus}
      changeNameValue={changeNameValue}
      creatingFormHandler={creatingFormHandler}
      creatingTaskFormHandler={creatingTaskFormHandler}
      updateColumnName={updateColumnName}
      updateTaskName={updateTaskName}
      updateTaskDescription={updateTaskDescription}
      toggleTaskStatus={toggleTaskStatus}
      deleteColumn={deleteColumn}
      deleteTask={deleteTask}
    />
  );
}

export default BoardPage;
