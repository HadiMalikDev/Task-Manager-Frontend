import Head from "next/head";
import React from "react";
import AuthImage from "../../public/auth.svg";
import FormSection from "../../components/home/Form-Section";
export default function RegisterPage() {
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
      <div className="main">
        <FormSection isRegister={false} />
        <AuthImage className="auth-image" />
      </div>
    </>
  );
}
