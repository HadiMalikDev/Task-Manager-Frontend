import React from "react";
export default function ErrorComponent({ message }) {
  return (
    <h3
      style={{
        textAlign: "center",
        margin: "0px 15px",
        border: "1px solid red",
      }}
    >
      {message}
    </h3>
  );
}
