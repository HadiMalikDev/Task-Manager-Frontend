import React from "react";
import ErrorComponent from "../../shared/error";
const { handleFormInputChange, handleSubmission } =
  require("./functions").default;

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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  if (loading) {
    return <h2 className="center">Loading...</h2>;
  }
  return (
    <div className="form--section">
      <div className="spacer"></div>
      <h1>{isRegister ? "Create Account" : "Login"}</h1>
      {error && <ErrorComponent message={error} />}
      <form
        onSubmit={(event) =>
          handleSubmission(event, formData, isRegister, setLoading, setError)
        }
      >
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
            placeholder="Min length 9"
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
