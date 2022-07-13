import React from "react";

export default function checkAuthenticationStatus(setAuthentication) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to be authenticated to proceed");
    location.replace("/auth/login");
  } else {
    setAuthentication(true);
  }
}
