
import React from "react";
import AuthImage from "../../public/auth.svg";
import FormSection from "../../components/auth/Auth-Form/Auth-Form";
export default function RegisterPage() {
  return (
    <div className="main">
      <FormSection isRegister={false} />
      <AuthImage className="auth-image" />
    </div>
  );
}
