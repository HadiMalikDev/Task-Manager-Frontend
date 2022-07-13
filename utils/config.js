export default function getDomain() {
  const isProduction = true;
  return isProduction
    ? "https://hadi-task-api-node.herokuapp.com"
    : "http://localhost:5000";
}
