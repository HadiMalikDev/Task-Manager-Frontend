import Head from "next/head";
import React from "react";
export default function HomePage() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
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
          <a id="register" href="/auth/register">Register</a>
        </div>
      </main>
    </>
  );
}
