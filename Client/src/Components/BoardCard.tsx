import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Board {
  id: number;
  name: string;
  colsNumber: number;
}

interface Props {
  board: Board;
  onUpdateName: (id: number, newName: string) => void;
  onDelete: (id: number) => void;
}

export const BoardCard = ({ board, onUpdateName, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(board.name);

  const startEditing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    setEditName(board.name);
  };

  const cancelEditing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (editName.trim()) {
      onUpdateName(board.id, editName);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Link to={"/column/" + board.id} className="relative group">
        <div className="card w-72 h-32 bg-base-100 shadow-xl border border-base-content/10 relative">
          <div className="card-body p-5">
            <div
              className="flex items-center gap-2 w-full h-full"
              onClick={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input input-bordered input-sm w-full focus:outline-none text-base-content"
                autoFocus
                onClick={(e) => e.preventDefault()}
              />
              <div className="flex flex-col gap-1">
                <button
                  onClick={handleSave}
                  className="btn btn-xs btn-success btn-square text-white"
                >
                  ✓
                </button>
                <button
                  onClick={cancelEditing}
                  className="btn btn-xs btn-error btn-square text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={"/column/" + board.id} className="relative group">
      <div className="card w-72 h-32 bg-base-100 shadow-xl hover:scale-105 transition-transform cursor-pointer border border-base-content/10 relative">
        <div className="absolute top-2 right-2 flex gap-1 z-20">
          <button
            onClick={startEditing}
            className="p-2 rounded-full text-base-content/50 hover:bg-base-200 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.043.044a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.044c0 .917.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.044.043a1.875 1.875 0 002.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.044c.917 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608c.162-.06.321-.127.478-.198a.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.043-.044a1.875 1.875 0 00.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.092a1.875 1.875 0 001.566-1.849v-.044c0-.917-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.45 7.45 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.044-.043a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.448 7.448 0 00-.478-.198.798.798 0 01-.517-.608l-.092-.55a1.875 1.875 0 00-1.849-1.566h-.044zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm("Czy na pewno chcesz usunąć tę tablicę?")) {
                onDelete(board.id);
              }
            }}
            className="p-2 rounded-full text-base-content/50 hover:bg-base-200 hover:text-error transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.49 1.478l-.565 9.064a3 3 0 01-2.991 2.748H7.667a3 3 0 01-2.991-2.748L4.11 6.695a.75.75 0 01-.49-1.478 48.567 48.567 0 013.878-.512V4.478a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25zm-6.25 7.772a.75.75 0 10-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm4.5 0a.75.75 0 10-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="card-body p-5">
          <h3 className="card-title text-primary pr-6 truncate">
            {board.name}
          </h3>
          <p className="text-sm opacity-70">Kolumn: {board.colsNumber}</p>
        </div>
      </div>
    </Link>
  );
};
