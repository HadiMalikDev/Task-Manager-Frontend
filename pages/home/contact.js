import React from "react";
import Contact from "../../components/home/Contact";
import HomePageTemplate from "../../components/home/Home-Template";

export default function ContactPage() {
  const footerChildren = [
    <a href="https://www.flaticon.com/free-icons/cat" key="gitHublogo">GitHub Logo Credits</a>,
    <a href="https://www.flaticon.com/free-icons/gmail" key="gmaillogo">Gmail Logo Credits</a>,
    <a href="https://www.flaticon.com/free-icons/linkedin" key="linkedInlogo">LinkedIn Logo Credits</a>,
  ];
  return (
    <HomePageTemplate footerChildren={footerChildren}>
      <Contact />
    </HomePageTemplate>
  );
}
