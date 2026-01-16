import Column from "./Column";
import type { ColumnStuff } from "./BoardPage";

interface CardProps {
  cols: ColumnStuff[];
  status: boolean;
  newColumnName: string;
  validationError: boolean;
  creatingTaskFormHandler: (
    columnId: number,
    name: string,
    descriptions: string
  ) => void;
  setStatus: (value: boolean) => void;
  changeNameValue: (value: React.ChangeEvent<HTMLInputElement>) => void;
  creatingFormHandler: () => void;
  updateColumnName: (id: number, name: string) => void;
  updateTaskName: (id: number, name: string) => void;
  updateTaskDescription: (id: number, desc: string) => void;
  toggleTaskStatus: (id: number) => void;
  deleteColumn: (id: number) => void;
  deleteTask: (id: number) => void;
}

function Card(card: CardProps) {
  return (
    <div className="flex w-full h-full min-h-screen overflow-x-auto bg-base-300 p-6 gap-6 items-start">
      {card.cols.map((col) => {
        return (
          <Column
            key={col.id}
            columnId={col.id}
            tasks={col.tasks}
            columnName={col.name}
            creatingTaskFormHandler={card.creatingTaskFormHandler}
            updateColumnName={card.updateColumnName}
            updateTaskName={card.updateTaskName}
            updateTaskDescription={card.updateTaskDescription}
            toggleTaskStatus={card.toggleTaskStatus}
            deleteColumn={card.deleteColumn}
            deleteTask={card.deleteTask}
          />
        );
      })}

      <div className="w-80 flex-shrink-0">
        <button
          onClick={() => card.setStatus(true)}
          className="w-full h-20 rounded-xl border-2 border-dashed border-base-content/20 hover:border-primary hover:text-primary hover:bg-base-200/50 transition-all text-base-content/50 flex items-center justify-center gap-2 font-semibold"
        >
          <span className="text-2xl">+</span> Dodaj nową kolumnę
        </button>
      </div>

      {card.status && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-base-100 p-6 rounded-2xl shadow-2xl w-11/12 md:w-96 relative border border-base-content/10 zoom-in-95">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                card.setStatus(false);
                if (card.validationError && card.changeNameValue) {
                  const event = {
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLInputElement>;
                  card.changeNameValue(event);
                }
              }}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-4 text-base-content">
              Nowa kolumna
            </h3>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nazwa kolumny</span>
              </label>
              <input
                type="text"
                placeholder="Np. Testy"
                className={`input input-bordered w-full focus:input-primary ${
                  card.validationError ? "input-error" : ""
                }`}
                value={card.newColumnName}
                onChange={card.changeNameValue}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") card.creatingFormHandler();
                  if (e.key === "Escape") card.setStatus(false);
                }}
              />
              {card.validationError && (
                <span className="text-error text-sm mt-1">
                  Nazwa jest wymagana!
                </span>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => card.setStatus(false)}
              >
                Anuluj
              </button>
              <button
                className="btn btn-primary"
                onClick={() => card.creatingFormHandler()}
              >
                Stwórz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
