"use client";

import { useTranslation } from "@/lib/i18n";
import {
  fadeUp,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import PrimaryButton from "@/ui/PrimaryButton";
import { motion } from "framer-motion";
import Image from "next/image";
import delivery from "/public/assets/images/delivery.png";

const GetStarted = () => {
  const t = useTranslation();

  return (
    <section className="container-xl pb-24">
      <motion.div
        variants={staggerContainer}
        {...inViewProps}
        className="text-center space-y-6"
      >
        <motion.div
          variants={staggerItem}
          className="space-y-4 max-w-xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">
            {t.home.getStarted.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {t.home.getStarted.subtitle}
          </p>
          <PrimaryButton href="/register" size="lg">
            {t.home.getStarted.cta} →
          </PrimaryButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={0.15}
          className="flex justify-center"
        >
          <Image
            src={delivery}
            className="w-full max-w-4xl h-56 md:h-96 object-cover rounded-2xl shadow-2xl"
            width={2000}
            height={800}
            alt="Speed Xpress delivery service"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;
