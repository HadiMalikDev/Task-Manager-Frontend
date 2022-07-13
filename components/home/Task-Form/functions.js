import sendGraphQLQuery from "../../../utils/graphql";

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
    throw Error(data.message);
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
function getRelevantGraphQLQuery(isUpdation) {
  return isUpdation
    ? `mutation Mutation($id:Int!,$taskObject:updateFields,$token:String!){
    updateTask(id:$id,updateFields:$taskObject,token:$token){
        __typename
        ... on mutationResult{
            success
        }
        ... on OperationFailed{
            message
        }
    }
}`
    : `mutation Mutation($taskObject:newTask,$token:String!){
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

async function handleSubmission(
  taskObject,
  isUpdation,
  taskId,
  abortSignal,
  setLoading,
  setError
) {
  if (!taskObject.title || !taskObject.description) {
    setLoading(false);
    setError("One or more of the required fields are empty.");
    return;
  }
  const graphQLQuery = getRelevantGraphQLQuery(isUpdation);
  const variables = { taskObject };
  variables.token = localStorage.getItem("token");
  if (taskId) {
    variables.id = parseInt(taskId);
  }
  try {
    setLoading(true);
    setError(null);
    const result = await sendGraphQLQuery(graphQLQuery, variables, abortSignal);
    const jsonResponse = await result.json();
    if (
      jsonResponse.data[isUpdation ? "updateTask" : "createTask"]?.success ??
      false
    ) {
      setLoading(false);
      setError(null);
      alert(`Task ${isUpdation ? "Updated" : "Created"}`);
      location.replace("/home");
    } else {
      throw Error("Could not update Task");
    }
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
}

const exportObject = {
  getTask,
  handleFormChange,
  handleSubmission,
};
export default exportObject;
