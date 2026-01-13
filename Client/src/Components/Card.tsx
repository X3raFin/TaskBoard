import Column from "./Column";

import type { ColumnStuff } from "./BoardPage";

interface CardProps {
  cols: ColumnStuff[];

  status: boolean;

  creatingNewTask: boolean;

  newColumnName: string;

  setCreatingNewTask: (value: boolean) => void;

  setStatus: (value: boolean) => void;

  changeNameValue: (value: React.ChangeEvent<HTMLInputElement>) => void;

  creatingFormHandler: () => void;
}

function Card(card: CardProps) {
  return (
    <div id="Columns">
      {" "}
      {card.cols.map((col) => {
        return (
          <Column
            key={col.id}
            tasks={col.tasks}
            columnName={col.name}
            setCreatingNewTask={card.setCreatingNewTask}
            creatingNewTask={card.creatingNewTask}
          />
        );
      })}
      <button onClick={() => card.setStatus(!card.status)}>+</button>{" "}
      {card.status && (
        <div id="CreatingForm">
          {" "}
          <button
            className="btn-accent"
            id="Exit"
            onClick={() => card.setStatus(false)}
          >
            X{" "}
          </button>
          Nazwa nowej kolumny:{" "}
          <input
            type="text"
            id="Nazwa"
            value={card.newColumnName}
            onChange={card.changeNameValue}
          />{" "}
          <button id="submit" onClick={() => card.creatingFormHandler()}>
            Stwórz{" "}
          </button>{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default Card;
