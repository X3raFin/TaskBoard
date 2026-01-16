import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import Card from "./Card";
import toast, { Toaster } from "react-hot-toast";

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
  const [validationError, setValidationError] = useState<boolean>(false);

  const url = "http://localhost:5112/api/TaskBoard/columns/";

  const fetchData = async () => {
    try {
      const response = await fetch(url + params.BoardId);
      if (!response.ok) throw new Error("Operacja nie dostała kodu 200.");
      const json: ColumnStuff[] = await response.json();
      setCols(json);
    } catch (error) {
      toast.error("Nie udało się pobrać kolumn.");
    }
  };

  const creatingFormHandler = async () => {
    if (!newColumnName.trim()) {
      setValidationError(true);
      toast.error("Nazwa kolumny nie może być pusta!");
      return;
    }

    try {
      const response = await fetch(url + params.BoardId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: newColumnName }),
      });
      if (!response.ok) throw new Error("Błąd zapisu");

      fetchData();
      toast.success("Dodano nową kolumnę!");
      setNewColumnName("");
      setStatus(false);
      setValidationError(false);
    } catch (error) {
      toast.error("Wystąpił problem podczas tworzenia kolumny.");
    }
  };

  const creatingTaskFormHandler = async (
    columnId: number,
    name: string,
    descriptions: string
  ) => {
    if (!name.trim()) {
      toast.error("Nazwa zadania jest wymagana!");
      return;
    }

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
      if (response.ok) {
        fetchData();
        toast.success("Dodano nowe zadanie!");
      } else {
        throw new Error("Błąd zapisu zadania");
      }
    } catch (error) {
      toast.error("Nie udało się dodać zadania.");
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
      toast.error("Nie udało się zmienić statusu.");
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
      else toast.error("Błąd zmiany nazwy kolumny");
    } catch (error) {
      toast.error("Nie udało się zmienić nazwy kolumny.");
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
      toast.error("Nie udało się zmienić nazwy zadania.");
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
      toast.error("Nie udało się zmienić opisu.");
    }
  };

  const deleteColumn = async (id: number) => {
    try {
      const response = await fetch(url + "deleteColumn/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData();
        toast.success("Kolumna usunięta.");
      } else {
        toast.error("Nie udało się usunąć kolumny.");
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas usuwania.");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(url + "deleteTask/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData();
        toast.success("Zadanie usunięte.");
      } else {
        toast.error("Nie udało się usunąć zadania.");
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas usuwania.");
    }
  };

  const changeNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
    if (validationError) setValidationError(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
        validationError={validationError}
      />
    </>
  );
}

export default BoardPage;
