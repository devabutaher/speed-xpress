"use client";

import { useTranslation } from "@/lib/i18n";
import { fadeLeft, fadeRight, inViewProps } from "@/lib/motion";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { motion } from "framer-motion";
import Image from "next/image";

const OrderPlace = () => {
  const t = useTranslation();
  const content = t.home.orderPlace;

  return (
    <section className="container-xl pb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text — left on desktop */}
        <motion.div
          {...inViewProps}
          variants={fadeRight}
          className="flex flex-col justify-center text-center md:text-left space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug">
            {content.title}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-start justify-center">
            <PrimaryButton href="/create-parcel" size="md">
              📦 Create Parcel (Demo)
            </PrimaryButton>
            <SecondaryButton href="/login" size="md">
              {content.getStarted}
            </SecondaryButton>
          </div>
        </motion.div>

        {/* Image — right on desktop */}
        <motion.div
          {...inViewProps}
          variants={fadeLeft}
          className="flex items-center justify-center"
        >
          <Image
            src="/assets/images/section2.png"
            width={600}
            height={600}
            alt="Online order placement illustration"
            className="w-full max-w-md drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default OrderPlace;
