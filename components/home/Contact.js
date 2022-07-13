import Image from "next/image";
import React from "react";
export default function Contact() {
  return (
    <div className="contact">
      <a
        className="github"
        href="https://github.com/HadiMalikDev"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          className="logo--image"
          src="/github.png"
          alt="githubLogo"
          width="200%"
          height="200%"
          layout="intrinsic"
        />
        <h1>Github</h1>
      </a>
      <a
        className="gmail"
        href="mailto:hadimalikdev@gmail.com"
        target="_blank"
        rel="noreferrer"
      >
        <div>
          <Image
            className="logo--image"
            src="/gmail.png"
            alt="gmailLogo"
            width="200%"
            height="200%"
            layout="intrinsic"
          />
        </div>
        <h1>Gmail</h1>
      </a>
      <a
        className="linkedIn"
        href="https://www.linkedin.com/in/muhammad-hadi-223118209/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          className="logo--image"
          src="/linkedIn.png"
          alt="linkedInLogo"
          width="200%"
          height="200%"
          layout="intrinsic"
        />
        <h1>LinkedIn</h1>
      </a>
    </div>
  );
}
