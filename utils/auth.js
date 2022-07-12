export default function useCheckAuthenticationStatus(setAuthentication) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to be authenticated to proceed");
    location.replace("/auth/login");
  } else {
    setAuthentication(true);
  }
}
