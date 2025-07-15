import Column from "./Column";
import type { ColumnsStuff } from "./BoardPage";

interface CardProps {
  cols: ColumnsStuff;
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
      {Object.keys(card.cols).map((columnName) => {
        return (
          <Column
            col={card.cols}
            columnName={columnName}
            setCreatingNewTask={card.setCreatingNewTask}
            creatingNewTask={card.creatingNewTask}
          />
        );
      })}
      <button onClick={() => card.setStatus(!card.status)}>+</button>
      <div
        id="CreatingForm"
        style={{ display: card.status === false ? "none" : "flex" }}
      >
        <button id="Exit" onClick={() => card.setStatus(false)}>
          X
        </button>
        Nazwa nowej kolumny:
        <input
          type="text"
          id="Nazwa"
          value={card.newColumnName}
          onChange={card.changeNameValue}
        />
        <button id="submit" onClick={() => card.creatingFormHandler()}>
          Stwórz
        </button>
      </div>
    </div>
  );
}

export default Card;
