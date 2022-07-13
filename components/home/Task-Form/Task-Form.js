import { useRouter } from "next/router";
import React from "react";
import ErrorComponent from "../../shared/error";
const { getTask, handleFormChange, handleSubmission } =
  require("./functions").default;

export default function TaskForm() {
  const params = useRouter();
  const [taskObject, setTaskObject] = React.useState({
    title: "",
    description: "",
  });
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { taskId } = params.query;
  const isUpdation = taskId != null;
  React.useEffect(function () {
    if (taskId) {
      setLoading(true);
      const controller = new AbortController();
      const taskPromise = getTask(taskId, controller.signal);
      taskPromise
        .then((task) => {
          setTaskObject({ title: task.title, description: task.description });
          setLoading(false);
          setError(null);
        })
        .catch((e) => {
          if (e.name != "AbortError") {
            setLoading(false);
            setError(e.message);
          }
        });
      return function cleanUp() {
        controller.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  if (isUpdation && isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div style={{ height: "100%" }}>
      {error && <ErrorComponent message={error} />}
      <form
        className="task--form"
        onSubmit={(e) => {
          e.preventDefault();
          const controller = new AbortController();
          handleSubmission(
            taskObject,
            isUpdation,
            taskId,
            controller.signal,
            setLoading,
            setError
          );
        }}
      >
        <h1>{isUpdation ? "Update Task" : "Create Task"}</h1>
        <input
          type="text"
          name="title"
          placeholder="Enter task Title"
          value={taskObject.title}
          onChange={(e) => handleFormChange(e, setTaskObject)}
        />
        <textarea
          name="description"
          placeholder="Enter task description here"
          value={taskObject.description}
          onChange={(e) => handleFormChange(e, setTaskObject)}
        ></textarea>
        <button type="submit">{isUpdation ? "Update" : "Upload"}</button>
      </form>
    </div>
  );
}
