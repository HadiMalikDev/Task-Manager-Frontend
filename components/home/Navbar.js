import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="nav">
      <h2>Task Manager</h2>
      <div className="nav--buttons">
        <Link href="/home/task">
          <button>New Task</button>
        </Link>
        <Link href="/home">
          <button>Tasks</button>
        </Link>
        <Link href="/home/contact">
          <button>Contact</button>
        </Link>
        <Link href="/home/about">
          <button>About</button>
        </Link>
      </div>
    </nav>
  );
}
