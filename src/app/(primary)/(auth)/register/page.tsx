import Register from "@/components/Register/Register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Join Speed Xpress as a customer, merchant, or rider. Create your free account today.",
};

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
