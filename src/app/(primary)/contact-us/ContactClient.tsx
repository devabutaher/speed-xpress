"use client";

import ContactForm from "@/components/Contact/ContactForm";
import {
  fadeRight,
  fadeUp,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { motion } from "framer-motion";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const contactDetails = [
  {
    icon: MdPhone,
    title: "Phone",
    lines: ["+880 1905-043478"],
    href: "tel:+8801905043478",
  },
  {
    icon: MdEmail,
    title: "Email",
    lines: ["teamcodeartisans@gmail.com"],
    href: "mailto:teamcodeartisans@gmail.com",
  },
  {
    icon: MdLocationOn,
    title: "Office",
    lines: ["Dhaka, Bangladesh"],
    href: null,
  },
];

const ContactClient = () => {
  return (
    <div className="container-xl py-10 lg:py-16 space-y-12">
      <motion.div {...inViewProps} variants={fadeUp} className="space-y-3">
        <h1 className="text-3xl font-bold uppercase lg:text-4xl">
          <span className="text-primary">CONTACT </span>US
        </h1>
        <div className="flex items-center gap-1">
          <span className="inline-block w-16 h-1 bg-primary rounded-full" />
          <span className="inline-block w-4 h-1 bg-primary rounded-full" />
          <span className="inline-block w-2 h-1 bg-primary rounded-full" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
          We&apos;d love to hear from you. Please fill out this form or shoot us
          an email.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="grid sm:grid-cols-2 gap-5 content-start"
        >
          {contactDetails.map(({ icon: Icon, title, lines, href }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-card space-y-3"
            >
              <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold">{title}</h3>
              {lines.map((line) =>
                href ? (
                  <a
                    key={line}
                    href={href}
                    className="block text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={line} className="text-sm text-gray-500">
                    {line}
                  </p>
                ),
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...inViewProps} variants={fadeRight}>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactClient;
