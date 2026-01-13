import { useState } from "react";
import type { ToDos } from "./BoardPage";
import ToDo from "./ToDo";

interface ColumnProps {
  tasks: ToDos[];
  columnId: string;
  columnName: string;
  creatingTaskFormHandler: (
    columnId: number,
    name: string,
    descriptions: string
  ) => void;
}

function Column(column: ColumnProps) {
  const [isTaskCreated, setIsTaskCreated] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  return (
    <div className="w-80 flex-shrink-0 flex flex-col bg-base-200 max-h-full rounded-xl shadow-xl border border-base-content/5">
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-bold text-base-content uppercase tracking-wider text-sm">
          {column.columnName}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-3 min-h-[100px]">
        {column.tasks.map((t) => {
          return (
            <ToDo
              key={t.id}
              id={t.id}
              columnId={t.columnId}
              name={t.name}
              descriptions={t.descriptions}
              order={t.order}
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
                    Number(column.columnId),
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
