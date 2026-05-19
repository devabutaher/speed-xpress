"use client";

import { useTranslation } from "@/lib/i18n";
import {
  fadeLeft,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { motion } from "framer-motion";
import Image from "next/image";
import cardboard from "/public/assets/images/cardboard.png";
import truck from "/public/assets/images/mobile_truck.png";
import worldwide from "/public/assets/images/worldwide.png";

const OrderNow = () => {
  const t = useTranslation();
  const content = t.home.orderNow;

  return (
    <section className="container-xl pb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image collage */}
        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="grid grid-cols-2 gap-4 max-sm:order-last"
        >
          <motion.div variants={staggerItem}>
            <Image
              src={worldwide}
              className="rounded-full w-full h-full object-cover shadow-lg"
              placeholder="blur"
              width={640}
              height={640}
              alt="Worldwide delivery"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <Image
              src={cardboard}
              className="rounded-2xl w-full h-full object-cover shadow-lg"
              placeholder="blur"
              width={640}
              height={640}
              alt="Cardboard packaging"
            />
          </motion.div>
          <motion.div
            variants={staggerItem}
            className="col-span-2 grid grid-cols-2"
          >
            <div />
            <Image
              src={truck}
              className="rounded-2xl w-full object-cover shadow-lg"
              placeholder="blur"
              width={640}
              height={640}
              alt="Mobile delivery truck"
            />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          {...inViewProps}
          variants={fadeLeft}
          className="flex flex-col justify-center text-center md:text-left space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug">
            {content.title}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-start justify-center">
            <PrimaryButton href="/login" size="md">
              {content.getStarted}
            </PrimaryButton>
            <SecondaryButton href="/register" size="md">
              {content.orderNow}
            </SecondaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrderNow;
