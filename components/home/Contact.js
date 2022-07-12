import React from "react";
export default function Contact() {
  return (
    <div className="contact">
      <a className="github" href="https://github.com/HadiMalikDev" target="_blank">
        <img className="logo--image" src="/github.png" />
        <h1>Github</h1>
      </a>
      <a className="gmail" href="mailto:hadimalikdev@gmail.com" target="_blank">
        <img className="logo--image" src="/gmail.png" />
        <h1>Gmail</h1>
      </a>
      <a
        className="linkedIn"
        href="https://www.linkedin.com/in/muhammad-hadi-223118209/"
        target="_blank"
      >
        <img className="logo--image" src="/linkedIn.png" />
        <h1>LinkedIn</h1>
      </a>
    </div>
  );
}
