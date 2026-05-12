import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Speed Xpress team. We'd love to hear from you.",
};

export default function ContactPage() {
  return <ContactClient />;
}
