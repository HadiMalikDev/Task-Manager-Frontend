import { useRouter } from "next/router";
import React from "react";
import Navbar from "./Navbar";
import checkAuthenticationStatus from "../utils/auth";
import sendGraphQLQuery from "../utils/graphql";

function getTaskFromGraphQL(id, token) {
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
    { id, token }
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
function getTask(taskId) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    try {
      const queryResult = getTaskFromGraphQL(taskId, token);
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
async function handleSubmit(taskObject, isUpdation, taskId) {
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
    const result = await sendGraphQLQuery(graphQLQuery, variables);
    const jsonResponse = await result.json();
    console.log(jsonResponse);
  } catch (error) {
    //   console.log(error);
  }
}
export default function TaskPage() {
  const params = useRouter();
  const { taskId } = params.query;
  const [taskObject, setTaskObject] = React.useState({
    title: "",
    description: "",
  });
  const isUpdation = taskId != null;
  const [authenticationConfirmed, setAuthenticationConfirmed] =
    React.useState(false);

  React.useEffect(function () {
    checkAuthenticationStatus(setAuthenticationConfirmed);
    if (taskId) {
      const taskPromise = getTask(taskId);
      taskPromise
        .then((task) => {
          setTaskObject({ title: task.title, description: task.description });
        })
        .catch((e) => alert(e));
    }
  }, []);
  if (!authenticationConfirmed) {
    return <h2>Loading</h2>;
  }
  return (
    <div>
      <Navbar />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(taskObject, isUpdation, taskId);
        }}
      >
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
