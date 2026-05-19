"use client";

import { useTranslation } from "@/lib/i18n";
import {
  fadeRight,
  fadeUp,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { motion } from "framer-motion";
import {
  MdAddHome,
  MdAttachMoney,
  MdOutlineShareLocation,
} from "react-icons/md";

const features = [
  {
    icon: MdOutlineShareLocation,
    titleKey: "transparentPricing" as const,
    descKey: "transparentPricingDesc" as const,
  },
  {
    icon: MdAddHome,
    titleKey: "warehouseStorage" as const,
    descKey: "warehouseStorageDesc" as const,
  },
  {
    icon: MdAttachMoney,
    titleKey: "onlineTracking" as const,
    descKey: "onlineTrackingDesc" as const,
  },
];

const WhatWeOffer = () => {
  const t = useTranslation();
  const offer = t.home.whatWeOffer;

  return (
    <section className="container-xl pb-24">
      <div className="border border-gray-200 dark:border-gray-800 md:p-10 p-5 rounded-2xl bg-white dark:bg-gray-950 shadow-card">
        {/* Section header */}
        <div className="grid md:grid-cols-2 gap-6 pb-10">
          <motion.div
            {...inViewProps}
            variants={fadeRight}
            className="space-y-4"
          >
            <span className="inline-flex items-center px-5 py-2 rounded-full border border-primary text-primary text-sm font-bold uppercase tracking-wider">
              {offer.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
              {offer.title}
            </h2>
          </motion.div>

          <motion.p
            {...inViewProps}
            variants={fadeUp}
            className="md:text-lg text-gray-500 border-l-4 border-primary pl-6 flex items-center"
          >
            {offer.subtitle}
          </motion.p>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="grid lg:grid-cols-3 gap-5"
        >
          {features.map(({ icon: Icon, titleKey, descKey }) => (
            <motion.div
              key={titleKey}
              variants={staggerItem}
              className="group relative rounded-xl bg-blue-50 dark:bg-gray-900 p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              {/* Icon circle */}
              <div className="mb-6 inline-flex p-3 bg-primary rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Icon size={44} className="text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">
                {offer[titleKey]}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {offer[descKey]}
              </p>

              {/* Subtle gradient accent on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
