import React from "react";
import TasksList from "../../components/home/Tasks-List";
import HomePageTemplate from "../../components/home/Home-Template";

export default function HomePage() {
  return (
    <HomePageTemplate>
      <TasksList />
    </HomePageTemplate>
  );
}
