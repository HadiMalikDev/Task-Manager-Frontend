import React from "react";

export default function AboutMe() {
  return (
    <div className="about">
      <h1>About This Page</h1>
      <p>
        This website serves as the frontend to the Task Api I created using
        NodeJS, MySQL, Redis, Express and GraphQL. The frontend, created using
        React now makes the task application my second full-stack application.
      </p>
      <h2>Difficulties Encountered</h2>
      <p>
        Making the site responsive was tricky, and required constant code
        refactors to make the site easy to view on all screen sizes. Though this
        application is the first time I am utilizing React in a self project, I
        did not face much difficulty in using React and dealing with its state.
        <br />
        This is due to my previous experience with Flutter. Flutter extensively
        utilizes the concept of reusable components, state and passing of props
        down to children. It was easy to port that knowledge over to React and
        apply it here.
      </p>
    </div>
  );
}
