import Link from "next/link";
import React from "react";

export default function Task({ props, toggleCompleted, deleteTask }) {
  const { taskId, title, description, created_at, completed } = props;

  return (
    <div className="task">
      <div className="task--section--1">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleCompleted()}
        />
        <h2 className="task--title">{title}</h2>
      </div>
      <p className="task--description">{description}</p>
      <div className="spacer"></div>
      <div className="task--options">
        <Link href={`/home/task?taskId=${taskId}`}>
          <button className="modify--button">Modify Task</button>
        </Link>
        <button className="delete--button" onClick={deleteTask}>
          Delete Task
        </button>
      </div>
    </div>
  );
}
