import type { ToDos } from "./BoardPage";

function ToDo(task: ToDos) {
  return (
    <div className="Task">
      <h4>{task.name}</h4> <p>{task.descriptions}</p>{" "}
    </div>
  );
}

export default ToDo;
