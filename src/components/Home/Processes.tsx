"use client";

import { fadeLeft, fadeRight, inViewProps } from "@/lib/motion";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { motion } from "framer-motion";
import Image from "next/image";

const Processes = () => {
  return (
    <section className="container-xl pb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          {...inViewProps}
          variants={fadeRight}
          className="flex items-center justify-center"
        >
          <Image
            src="/assets/images/section1.png"
            width={600}
            height={600}
            alt="Streamline logistics processes illustration"
            className="w-full max-w-md drop-shadow-xl"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          {...inViewProps}
          variants={fadeLeft}
          className="flex flex-col justify-center text-center md:text-left space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Streamline <span className="text-primary">Logistics</span> Processes
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Streamline logistics processes such as inventory management, order
            tracking, and delivery scheduling — all from one intuitive
            dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-start justify-center">
            <PrimaryButton href="/login" size="md">
              Get Started
            </PrimaryButton>
            <SecondaryButton href="/register" size="md">
              Order Now
            </SecondaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Processes;
