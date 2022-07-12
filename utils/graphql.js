export default function sendGraphQLQuery(query, variables, abortSignal) {
  return fetch("http://localhost:5000/graphql", {
    signal: abortSignal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
}
