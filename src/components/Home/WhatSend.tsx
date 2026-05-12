"use client";

import {
  fadeUp,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { motion } from "framer-motion";
import { FaDesktop, FaGift, FaSitemap } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";

const items = [
  { name: "Gift", icon: FaGift },
  { name: "Document", icon: IoDocumentTextSharp },
  { name: "Package", icon: LuPackage },
  { name: "Accessories", icon: FaSitemap },
  { name: "Electronics", icon: FaDesktop },
];

const WhatSend = () => {
  return (
    <section className="container-xl pb-20 space-y-10">
      <motion.h2
        {...inViewProps}
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center"
      >
        What <span className="text-primary">Can</span> You Send
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        {...inViewProps}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {items.map(({ name, icon: Icon }) => (
          <motion.div
            key={name}
            variants={staggerItem}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-8 rounded-2xl flex flex-col items-center gap-4 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 cursor-default"
          >
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary transition-colors duration-300">
              <Icon
                size={36}
                className="text-primary group-hover:text-white transition-colors duration-300"
              />
            </div>
            <p className="text-sm md:text-base font-semibold text-center uppercase tracking-wide">
              {name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhatSend;
