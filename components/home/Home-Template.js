import React from "react";
import checkAuthenticationStatus from "../../utils/auth";  
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function HomePageTemplate(props) {
  const [hasCheckedAuthentication, setAuthentication] = React.useState(false);
  React.useEffect(() => checkAuthenticationStatus(setAuthentication), []);

  if (!hasCheckedAuthentication) {
    return <h1 className="center">Loading...</h1>;
  }
  return (
    <div className="home-body">
      <Navbar />
      <div className="main--content">{props.children}</div>
      <Footer>{props.footerChildren}</Footer>
    </div>
  );
}
