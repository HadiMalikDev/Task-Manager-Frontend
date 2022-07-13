import React from "react";
export default function HomePage() {
  return (
    <main className="center">
      <h1>Task Manager</h1>
      <p>
        By:{"  "}
        <span>
          <a
            href="https://www.linkedin.com/in/muhammad-hadi-223118209/"
            target="_blank"
          >
            Muhammad Hadi
          </a>
        </span>
      </p>
      <div className="center--buttons">
        <a id="login">Login</a>
        <a id="register" href="/auth/register">
          Register
        </a>
      </div>
    </main>
  );
}
