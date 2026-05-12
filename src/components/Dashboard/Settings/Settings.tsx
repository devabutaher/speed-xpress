"use client";

import { fadeLeft, fadeRight } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import VerifyForm from "./VerifyForm";

const Settings = () => {
  return (
    <section className="container-xl py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeRight}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow-card max-w-lg w-full space-y-6"
        >
          <h1 className="text-xl sm:text-2xl font-bold">
            VERIFY <span className="text-primary">ACCOUNT</span>
          </h1>
          <VerifyForm />
          <p className="text-sm text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-800">
            Theme can be toggled anytime from the navigation bar at the top of
            the page.
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeLeft}
          className="flex items-center justify-center lg:flex-1"
        >
          <Image
            src="/assets/images/settings.png"
            width={600}
            height={600}
            alt="Settings illustration"
            className="w-full max-w-sm drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Settings;
