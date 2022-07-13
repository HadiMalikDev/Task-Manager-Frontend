import React from "react";
import Task from "../Task";
import Link from "next/link";
import ErrorComponent from "../../shared/error";
const { loadTasks, toggleCompleted, deleteTask } =
  require("./functions").default;

export default function TasksList() {
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const controller = new AbortController();
  React.useEffect(() => {
    setError(null);
    setLoading(true);
    loadTasks(setTasks, controller.signal, setLoading, setError);
    return function cleanUp() {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <h2 className="center">Loading...</h2>;
  }
  return (
    <div>
      {error && <ErrorComponent message={error} />}
      <div className="tasks--list">
        {tasks.length > 0 ? (
          tasks.map((e, index) => (
            <Task
              props={e}
              key={e.taskId}
              toggleCompleted={() =>
                toggleCompleted(e.taskId, e.completed, index,controller, setTasks,setLoading,setError)
              }
              deleteTask={() => deleteTask(e.taskId,controller,index,setTasks,setLoading,setError)}
            />
          ))
        ) : (
          <h2>
            No Tasks Added.{" "}
            <span>
              <Link href="/home/task">
                <div className="add-link">Add one!</div>
              </Link>
            </span>
          </h2>
        )}
      </div>
    </div>
  );
}
