export default function getDomain() {
  const isProduction = false;
  return isProduction
    ? "https://hadi-task-api-node.herokuapp.com"
    : "http://localhost:5000";
}
