import sendGraphQLQuery from "../../../utils/graphql";
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
    return tasks;
  } else {
    throw Error(data.message);
  }
}

function loadTasks(setTasks, signal, setLoading, setError) {
  setLoading(true);
  const token = localStorage.getItem("token");
  const getAllTasks = sendGraphQLQuery(graphQLQuery, { token }, signal);
  getAllTasks
    .then((data) => data.json())
    .then((data) => {
      setTasks(parseGraphQLResult(data));
      setLoading(false);
      setError(null);
    })
    .catch((e) => {
      if (e.name != "AbortError") {
        setLoading(false);
        setError(e.message);
      }
    });
}

async function toggleCompleted(
  taskId,
  currentValue,
  taskIndex,
  controller,
  setTasks,
  setLoading,
  setError
) {
  try {
    setLoading(true);
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
    if (data.data.updateTask?.success ?? false) {
      setTasks((prev) => {
        prev[taskIndex].completed = !currentValue;
        return prev;
      });
      setLoading(false);
      setError(null);
    } else {
      throw Error("Could not update task");
    }
  } catch (error) {
    if (error.name != "AbortError") {
      setLoading(false);
      setError(error.message);
    }
  }
}
async function deleteTask(
  taskId,
  controller,
  index,
  setTasks,
  setLoading,
  setError
) {
  try {
    setLoading(true);
    setError(null);
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
    setLoading(false);
    setTasks((prev) => {
      prev.splice(index, 1);
      return prev;
    });
  } catch (error) {
    if (error.name != "AbortError") {
      setLoading(false);
      setError(error.message);
    }
  }
}

export default { loadTasks, toggleCompleted, deleteTask };
