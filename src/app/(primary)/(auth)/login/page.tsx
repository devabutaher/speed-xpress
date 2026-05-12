import LoginForm from "@/components/Login/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Speed Xpress account to manage your parcels.",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
