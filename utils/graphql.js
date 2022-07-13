import getDomain from "./config";

export default function sendGraphQLQuery(query, variables, abortSignal) {
  return fetch(`${getDomain()}/graphql`, {
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
