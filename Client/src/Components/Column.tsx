import { useState } from "react";
import type { ToDos } from "./BoardPage";
import ToDo from "./ToDo";

interface ColumnProps {
  tasks: ToDos[];
  columnId: number;
  columnName: string;
  creatingTaskFormHandler: (
    columnId: number,
    name: string,
    descriptions: string
  ) => void;
  updateColumnName: (id: number, name: string) => void;
  updateTaskName: (id: number, name: string) => void;
  updateTaskDescription: (id: number, desc: string) => void;
  toggleTaskStatus: (id: number) => void;
  deleteColumn: (id: number) => void;
  deleteTask: (id: number) => void;
}

function Column(column: ColumnProps) {
  const [isTaskCreated, setIsTaskCreated] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [isEditingName, setIsEditingName] = useState(false);
  const [editColName, setEditColName] = useState(column.columnName);

  const handleSaveColumnName = () => {
    if (editColName.trim()) {
      column.updateColumnName(column.columnId, editColName);
      setIsEditingName(false);
    }
  };

  return (
    <div className="w-80 flex-shrink-0 flex flex-col bg-base-200 max-h-full rounded-xl shadow-xl border border-base-content/5 relative group/column">
      <div className="p-4 flex justify-between items-center min-h-[60px]">
        {isEditingName ? (
          <div className="flex gap-2 w-full">
            <input
              className="input input-sm input-bordered w-full"
              value={editColName}
              onChange={(e) => setEditColName(e.target.value)}
              autoFocus
            />
            <button
              onClick={handleSaveColumnName}
              className="btn btn-xs btn-success btn-square text-white"
            >
              ✓
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              className="btn btn-xs btn-ghost btn-square"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <h3
                className="font-bold text-base-content uppercase tracking-wider text-sm cursor-pointer"
                onClick={() => {
                  setIsEditingName(true);
                  setEditColName(column.columnName);
                }}
              >
                {column.columnName}
              </h3>
              <button
                onClick={() => {
                  setIsEditingName(true);
                  setEditColName(column.columnName);
                }}
                className="btn btn-xs btn-ghost btn-square opacity-0 group-hover/column:opacity-100 transition-opacity"
              >
                ✎
              </button>
            </div>

            <button
              onClick={() => {
                if (window.confirm("Czy na pewno chcesz usunąć tę kolumnę?")) {
                  column.deleteColumn(column.columnId);
                }
              }}
              className="btn btn-xs btn-ghost btn-square text-error opacity-0 group-hover/column:opacity-100 transition-opacity"
              title="Usuń kolumnę"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-3 min-h-[100px]">
        {column.tasks.map((t) => {
          return (
            <ToDo
              key={t.id}
              task={t}
              updateTaskName={column.updateTaskName}
              updateTaskDescription={column.updateTaskDescription}
              toggleTaskStatus={column.toggleTaskStatus}
              deleteTask={column.deleteTask}
            />
          );
        })}
      </div>

      <div className="p-3 pt-0">
        {!isTaskCreated ? (
          <button
            className="btn btn-ghost btn-block btn-sm justify-start text-base-content/50 hover:text-primary hover:bg-base-300"
            onClick={() => setIsTaskCreated(!isTaskCreated)}
          >
            <span className="text-lg">+</span> Dodaj kartę
          </button>
        ) : (
          <div className="p-1">
            <input
              type="text"
              placeholder="Wpisz tytuł..."
              className="input input-bordered input-sm w-full mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <textarea
              placeholder="Dodaj opis (opcjonalnie)..."
              className="textarea textarea-bordered textarea-sm w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <button
                className="btn btn-xs btn-ghost"
                onClick={() => setIsTaskCreated(!isTaskCreated)}
              >
                Anuluj
              </button>
              <button
                className="btn btn-xs btn-primary"
                onClick={() => {
                  column.creatingTaskFormHandler(
                    column.columnId,
                    name,
                    description
                  );
                  setIsTaskCreated(!isTaskCreated);
                  setName("");
                  setDescription("");
                }}
              >
                Zapisz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;
