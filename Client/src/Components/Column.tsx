import type { ColumnsStuff } from "./BoardPage";
import ToDo from "./Todo";

interface ColumnProps {
  col: ColumnsStuff;
  columnName: string;
  setCreatingNewTask: (value: boolean) => void;
  creatingNewTask: boolean;
}

function Column(column: ColumnProps) {
  const cContetnt = column.col;
  const cName: string = column.columnName;
  return (
    <div className="Column" key={column.columnName}>
      <h3>{column.columnName}</h3>
      {cContetnt[cName].map((t) => {
        return (
          <ToDo
            id={t.id}
            columnId={t.columnId}
            name={t.name}
            descriptions={t.descriptions}
            order={t.order}
          />
        );
      })}
      <button
        onClick={() => column.setCreatingNewTask(!column.creatingNewTask)}
      >
        +
      </button>
    </div>
  );
}

export default Column;
