import React from "react";

function handleFormInputChange(event, stateFunction) {
  const { name, value } = event.target;
  stateFunction((prev) => ({ ...prev, [name]: value }));
}
async function handleSubmission(event, formData, isRegister) {
  event.preventDefault();

  const apiDomainName = "http://localhost:5000";
  const endPoint = apiDomainName.concat(
    isRegister ? "/users/register" : "/users/login"
  );
  console.log(endPoint);
  const result = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (result.ok) {
    console.log("User registered!");
    const { token } = await result.json();
    localStorage.setItem("token", token);
    console.log(token)
  } else {
    const res = await result.json();
    alert(res.error);
  }
}
export default function FormSection({ isRegister }) {
  const initialObject = {
    email: "",
    password: "",
  };
  if (isRegister) {
    initialObject.name = "";
    initialObject.confirmPassword = "";
  }
  const [formData, setFormData] = React.useState(initialObject);
  return (
    <div className="form--section">
      <div className="spacer"></div>
      <h1>{isRegister ? "Create Account" : "Login"}</h1>
      <form onSubmit={(event) => handleSubmission(event, formData, isRegister)}>
        {isRegister && (
          <div>
            <label htmlFor="name">Username</label>
            <input
              name="name"
              type="text"
              placeholder="Bob"
              value={formData.name}
              onChange={(event) => handleFormInputChange(event, setFormData)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="xyz@gmail.com"
            value={formData.email}
            onChange={(event) => handleFormInputChange(event, setFormData)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Min length 8"
            value={formData.password}
            onChange={(event) => handleFormInputChange(event, setFormData)}
          />
        </div>
        {isRegister && (
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter Password"
              value={formData.confirmPassword}
              onChange={(event) => handleFormInputChange(event, setFormData)}
            />
          </div>
        )}
        <button type="submit">{isRegister ? "Create Account" : "Login"}</button>
      </form>

      <div className="alternative">
        <p>
          {isRegister ? "Already" : "Don't"} have an account?
          <span>
            <a href={`/auth/${isRegister ? "login" : "register"}`}>
              {" "}
              {isRegister ? "Login instead" : "Create Account"}
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
