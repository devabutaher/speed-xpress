"use client";

import { useTranslation } from "@/lib/i18n";
import {
  fadeUp,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    src: "/assets/images/logo/ajkerdeal.png",
    alt: "Ajker Deal",
    width: "w-36",
  },
  { src: "/assets/images/logo/paperfly.png", alt: "Paperfly", width: "w-40" },
  { src: "/assets/images/logo/daraz.png", alt: "Daraz", width: "w-32" },
  { src: "/assets/images/logo/pathao.png", alt: "Pathao", width: "w-32" },
  { src: "/assets/images/logo/redx.png", alt: "RedX", width: "w-32" },
];

const LogoCloud = () => {
  const t = useTranslation();

  return (
    <section className="container-xl pb-20 space-y-10">
      <motion.h2
        {...inViewProps}
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center"
      >
        {t.home.logoCloud.title}
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        {...inViewProps}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {partners.map(({ src, alt, width }) => (
          <motion.div
            key={alt}
            variants={staggerItem}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 py-5 px-4 flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow duration-300"
          >
            <Image
              src={src}
              className={`${width} h-auto object-contain`}
              width={300}
              height={100}
              alt={alt}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LogoCloud;
