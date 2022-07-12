import React from "react";
import Task from "./Task";
import sendGraphQLQuery from "../../utils/graphql";
const graphQLQuery = `
query Query($token:String!){
    tasks(token: $token){
    __typename
    ... on Tasks{
        tasks{
            taskId
            title
            description
            created_at
            completed
        }
    }
    ... on OperationFailed{
        message
    }
}
}`;
const toggleTaskQuery = `
mutation Mutation($id:Int!,$completed:Boolean!,$token:String!){
    updateTask(id:$id,updateFields:{completed:$completed},token:$token){
        __typename
        ... on mutationResult{
            success
        }
        ... on OperationFailed{
            message
        }
    }
}
`;
const deleteTaskQuery = `
mutation Mutation($id:Int!,$token:String!){
  deleteTask(id:$id,token:$token){
      __typename
      ... on mutationResult{
          success
      }
      ... on OperationFailed{
          message
      }
  }
}
`;
function parseGraphQLResult(obj) {
  const data = obj.data.tasks;
  const type = data.__typename;
  if (type === "Tasks") {
    const tasks = data.tasks;
    console.log(tasks);
    return tasks;
  } else {
    alert("Could not fetch tasks!");
    return [];
  }
}

function loadTasks(setTasks, signal) {
  const token = localStorage.getItem("token");
  const getAllTasks = sendGraphQLQuery(graphQLQuery, { token }, signal);
  getAllTasks
    .then((data) => data.json())
    .then((data) => {
      setTasks(parseGraphQLResult(data));
    })
    .catch((e) => {
      if (e.name != "AbortError") console.log(e);
    });
}
export default function TasksList() {
  const [tasks, setTasks] = React.useState([]);
  const controller = new AbortController();
  React.useEffect(() => {
    loadTasks(setTasks, controller.signal);
    return function cleanUp() {
      controller.abort();
    };
  }, []);

  async function toggleCompleted(taskId, currentValue) {
    try {
      const token = localStorage.getItem("token");
      const id = parseInt(taskId);
      if (isNaN(id) || typeof token != "string")
        throw Error("Invalid parameter type");
      const updateTask = await sendGraphQLQuery(
        toggleTaskQuery,
        {
          token,
          id,
          completed: !currentValue,
        },
        controller.signal
      );
      const data = await updateTask.json();
      loadTasks(setTasks, controller.signal);
    } catch (error) {
      if (error.name != "AbortError") console.log(error);
    }
  }
  async function deleteTask(taskId) {
    try {
      const token = localStorage.getItem("token");
      const id = parseInt(taskId);
      if (isNaN(id) || typeof token != "string")
        throw Error("Invalid parameter type");
      const deleteTaskResponse = await sendGraphQLQuery(
        deleteTaskQuery,
        {
          token,
          id: parseInt(taskId),
        },
        controller.signal
      );
      if (!deleteTaskResponse.ok) {
        throw Error("Could not complete Operation");
      }
      const json = await deleteTaskResponse.json();
      if (json.deleteTask?.success ?? false) {
        throw Error("Could not complete operation");
      }
      alert("Task deleted!");
      loadTasks(setTasks, controller.signal);
    } catch (error) {
      if (error.name != "AbortError") console.log(error);
    }
  }
  return (
    <div className="tasks--list">
      {tasks.map((e) => (
        <Task
          props={e}
          key={e.taskId}
          toggleCompleted={() => toggleCompleted(e.taskId, e.completed)}
          deleteTask={() => deleteTask(e.taskId)}
        />
      ))}
    </div>
  );
}
