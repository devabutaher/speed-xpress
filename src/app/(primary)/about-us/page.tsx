import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Speed Xpress — our mission to create an efficient, user-friendly platform for managing logistics operations across Bangladesh.",
};

export default function AboutPage() {
  return <AboutClient />;
}
