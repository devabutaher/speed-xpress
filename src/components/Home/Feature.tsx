"use client";

import { useTranslation } from "@/lib/i18n";
import {
  fadeUp,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";
import { MdShareLocation } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";

const features = [
  {
    icon: FiPackage,
    titleKey: "protectedPackages" as const,
    descKey: "protectedPackagesDesc" as const,
  },
  {
    icon: MdShareLocation,
    titleKey: "liveTracking" as const,
    descKey: "liveTrackingDesc" as const,
  },
  {
    icon: RiCustomerService2Line,
    titleKey: "customerSupport" as const,
    descKey: "customerSupportDesc" as const,
  },
];

const Feature = () => {
  const t = useTranslation();
  const feat = t.home.feature;

  return (
    <section className="container-xl pb-24">
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl shadow-card p-6 sm:p-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <motion.h2
            {...inViewProps}
            variants={fadeUp}
            className="text-3xl lg:text-4xl font-extrabold leading-snug max-w-sm"
          >
            {feat.title}
          </motion.h2>

          <motion.div
            {...inViewProps}
            variants={fadeUp}
            custom={0.1}
            className="flex items-center gap-4 max-w-sm"
          >
            <span className="w-1 h-16 bg-primary rounded-full shrink-0" />
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              {feat.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, titleKey, descKey }) => (
            <motion.div
              key={titleKey}
              variants={staggerItem}
              className="group bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 inline-flex rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feat[titleKey]}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feat[descKey]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;
