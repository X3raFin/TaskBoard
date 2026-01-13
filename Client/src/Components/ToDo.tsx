import type { ToDos } from "./BoardPage";

function ToDo(task: ToDos) {
  return (
    <div className="card bg-base-100 p-3 shadow-sm border border-base-content/10 cursor-pointer hover:shadow-md hover:border-primary hover:scale-[1.02] transition-all duration-200 group">
      <h4 className="text-sm font-bold text-base-content mb-1 group-hover:text-primary transition-colors">
        {task.name}
      </h4>
      <p className="text-xs text-base-content/70 line-clamp-3">
        {task.descriptions}
      </p>
    </div>
  );
}

export default ToDo;
