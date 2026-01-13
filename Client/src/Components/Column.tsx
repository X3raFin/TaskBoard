import type { ToDos } from "./BoardPage";

import ToDo from "./ToDo";

interface ColumnProps {
  tasks: ToDos[];

  columnName: string;

  setCreatingNewTask: (value: boolean) => void;

  creatingNewTask: boolean;
}

function Column(column: ColumnProps) {
  return (
    <div className="Column" key={column.columnName}>
      <h3>{column.columnName}</h3>
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
      <button
        onClick={() => column.setCreatingNewTask(!column.creatingNewTask)}
      >
        +
      </button>
      (creatingNewTask && ())
    </div>
  );
}

export default Column;
