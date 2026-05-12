"use client";

import { fadeLeft, fadeRight } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import PasswordForm from "./PasswordForm";

const Password = () => {
  return (
    <section className="container-xl py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Form card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeRight}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow-card max-w-lg w-full space-y-6"
        >
          <h1 className="text-xl sm:text-2xl font-bold">
            RESET <span className="text-primary">PASSWORD</span>
          </h1>
          <PasswordForm />
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeLeft}
          className="flex items-center justify-center lg:flex-1"
        >
          <Image
            src="/assets/images/reset.png"
            width={480}
            height={480}
            alt="Password reset illustration"
            className="w-full max-w-sm drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Password;
