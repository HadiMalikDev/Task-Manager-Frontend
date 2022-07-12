import React from "react";
import Head from "next/head";
import useCheckAuthenticationStatus from "../../utils/auth";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function HomePageTemplate(props) {
  const [hasCheckedAuthentication, setAuthentication] = React.useState(false);
  React.useEffect(() => useCheckAuthenticationStatus(setAuthentication), []);

  if (!hasCheckedAuthentication) {
    return <h1 className="center">Loading...</h1>;
  }
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="home-body">
        <Navbar />
        <div className="main--content">{props.children}</div>
        <Footer>{props.footerChildren}</Footer>
      </div>
    </>
  );
}
