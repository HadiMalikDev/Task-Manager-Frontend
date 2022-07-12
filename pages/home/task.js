import React from "react";
import HomePageTemplate from "../../components/home/Home-Template";
import TaskForm from "../../components/home/Task-Form";

export default function HomePage() {
  return (
    <HomePageTemplate>
      <TaskForm />
    </HomePageTemplate>
  );
}
