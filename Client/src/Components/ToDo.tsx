import { useState } from "react";
import type { ToDos } from "./BoardPage";

interface ToDoProps {
  task: ToDos;
  updateTaskName: (id: number, name: string) => void;
  updateTaskDescription: (id: number, desc: string) => void;
  toggleTaskStatus: (id: number) => void;
  deleteTask: (id: number) => void;
}

function ToDo({
  task,
  updateTaskName,
  updateTaskDescription,
  toggleTaskStatus,
  deleteTask,
}: ToDoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);
  const [editDesc, setEditDesc] = useState(task.descriptions);

  const handleSave = () => {
    if (editName !== task.name && editName.trim()) {
      updateTaskName(task.id, editName);
    }
    if (editDesc !== task.descriptions) {
      updateTaskDescription(task.id, editDesc);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="card bg-base-100 p-3 shadow-lg border border-primary ring-1 ring-primary">
        <input
          type="text"
          className="input input-sm input-bordered w-full mb-2 font-bold"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          autoFocus
        />

        <textarea
          className="textarea textarea-sm textarea-bordered w-full mb-2 min-h-[80px] leading-relaxed"
          placeholder="Opis zadania..."
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-1">
          <button
            onClick={() => setIsEditing(false)}
            className="btn btn-xs btn-ghost text-error"
          >
            Anuluj
          </button>
          <button onClick={handleSave} className="btn btn-xs btn-primary">
            Zapisz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 p-3 shadow-sm border border-base-content/10 cursor-pointer hover:shadow-md hover:border-primary hover:scale-[1.02] transition-all duration-200 group relative">
      <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
            setEditName(task.name);
            setEditDesc(task.descriptions);
          }}
          className="p-1.5 rounded-md bg-base-200 text-base-content/60 hover:bg-primary hover:text-white"
          title="Edytuj zadanie"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Usunąć zadanie?")) {
              deleteTask(task.id);
            }
          }}
          className="p-1.5 rounded-md bg-base-200 text-base-content/60 hover:bg-error hover:text-white"
          title="Usuń zadanie"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="radio radio-primary radio-sm mt-0.5 border-primary/40 checked:border-primary"
          checked={task.isDone}
          onChange={(e) => {
            e.stopPropagation();
            toggleTaskStatus(task.id);
          }}
        />

        <div
          className={`flex-1 ${
            task.isDone
              ? "opacity-50 line-through decoration-base-content/50"
              : ""
          }`}
        >
          <h4 className="text-sm font-bold text-base-content mb-1 pr-6">
            {task.name}
          </h4>
          {task.descriptions && (
            <p className="text-xs text-base-content/70 line-clamp-3 whitespace-pre-line">
              {task.descriptions}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
