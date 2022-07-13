import getDomain from "../../../utils/config";

function handleFormInputChange(event, stateFunction) {
  const { name, value } = event.target;
  stateFunction((prev) => ({ ...prev, [name]: value }));
}
async function handleSubmission(
  event,
  formData,
  isRegister,
  setLoading,
  setError
) {
  event.preventDefault();
  setLoading(true);
  setError(null);

  const apiDomainName = getDomain();
  const endPoint = apiDomainName.concat(
    isRegister ? "/users/register" : "/users/login"
  );
  try {
    if (!formData.password) {
      throw Error("Fields cannot be empty");
    }
    if (formData.password.length <= 8) {
      throw Error("Minimum Password length is 9");
    }
    if (isRegister) {
      if (formData.password != formData.confirmPassword) {
        throw Error("Passwords do not match");
      }
      if (!formData.name || !/^[a-zA-Z]+$/.test(formData.name)) {
        throw Error(
          "Username cannot contain whitespaces and can only contain characters between A-Z"
        );
      }
    }
    const result = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    if (result.ok) {
      const { token } = await result.json();
      localStorage.setItem("token", token);
      location.href = "/home";
    } else {
      const res = await result.json();
      throw Error(res.error);
    }
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
}
const exportObject = { handleFormInputChange, handleSubmission };
export default exportObject;
