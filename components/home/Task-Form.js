import { useRouter } from "next/router";
import React from "react";
import sendGraphQLQuery from "../../utils/graphql";

function getTaskFromGraphQL(id, token, abortSignal) {
  id = parseInt(id);
  token = token.toString();
  if (isNaN(id)) throw Error("Id should be an integer");
  return sendGraphQLQuery(
    `query Query($id:Int!,$token:String!){
              task(id:$id,token:$token){
                  __typename
                  ... on Task{
                      title
                      description
                  }
                  ... on OperationFailed{
                      message
                  }
              }
          }`,
    { id, token },
    abortSignal
  );
}
function parseGraphQLResult(result) {
  const data = result.data.task;
  const typename = data.__typename;
  if (typename === "Task") {
    return data;
  } else {
    throw Error("Could not fetch task.");
  }
}
function getTask(taskId, abortSignal) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    try {
      const queryResult = getTaskFromGraphQL(taskId, token, abortSignal);
      queryResult
        .then((res) => res.json())
        .then((obj) => {
          console.log("callle");
          const data = parseGraphQLResult(obj);
          resolve(data);
        });
    } catch (error) {
      reject("Could not fetch task");
    }
  });
}
function handleFormChange(e, setTaskObject) {
  const { name, value } = e.target;
  setTaskObject((prev) => ({ ...prev, [name]: value }));
}
async function handleSubmit(taskObject, isUpdation, taskId, abortSignal) {
  let graphQLQuery;
  if (isUpdation) {
    graphQLQuery = `mutation Mutation($id:Int!,$taskObject:updateFields,$token:String!){
              updateTask(id:$id,updateFields:$taskObject,token:$token){
                  __typename
                  ... on mutationResult{
                      success
                  }
                  ... on OperationFailed{
                      message
                  }
              }
          }`;
  } else {
    graphQLQuery = `mutation Mutation($taskObject:newTask,$token:String!){
          createTask(newTask:$taskObject,token:$token){
              __typename
              ... on mutationResult{
                  success
              }
              ... on OperationFailed{
                  message
              }
          }
      }`;
  }
  const variables = { taskObject };
  variables.token = localStorage.getItem("token");
  if (taskId) {
    variables.id = parseInt(taskId);
  }
  console.log(variables);
  try {
    const result = await sendGraphQLQuery(graphQLQuery, variables, abortSignal);
    const jsonResponse = await result.json();
    console.log(jsonResponse);
    if (jsonResponse.data?.updateTask?.success ?? false) {
      alert(`Task ${isUpdation ? "Updated" : "Deleted"}`);
      location.replace('/home')
    } else {
      alert("Could not complete operation");
    }
  } catch (error) {
    alert("Could not complete operation");
  }
}
export default function TaskForm() {
  const params = useRouter();
  const { taskId } = params.query;
  const [taskObject, setTaskObject] = React.useState({
    title: "",
    description: "",
  });
  const isUpdation = taskId != null;

  React.useEffect(function () {
    const controller = new AbortController();
    if (taskId) {
      const taskPromise = getTask(taskId, controller.signal);
      taskPromise
        .then((task) => {
          setTaskObject({ title: task.title, description: task.description });
        })
        .catch((e) => {
          if (e.name != "AbortError") alert(e);
        });
    }
    return function cleanUp() {
      controller.abort();
    };
  }, []);
  return (
    <form
      className="task--form"
      onSubmit={(e) => {
        e.preventDefault();
        const controller = new AbortController();
        handleSubmit(taskObject, isUpdation, taskId, controller.signal);
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
  );
}
