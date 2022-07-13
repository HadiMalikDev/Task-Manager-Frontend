import Link from "next/link";
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
            rel="noreferrer"
          >
            Muhammad Hadi
          </a>
        </span>
      </p>
      <div className="center--buttons">
        <Link href="/auth/login">
          <button id="login">Login</button>
        </Link>
        <Link href="/auth/register">
          <button id="register">Register</button>
        </Link>
      </div>
    </main>
  );
}
