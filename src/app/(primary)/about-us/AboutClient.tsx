"use client";

import {
  fadeRight,
  fadeUp,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { BiGlasses } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiCrossedChains } from "react-icons/gi";
import { LuNetwork } from "react-icons/lu";
import {
  MdOutlineNotificationsActive,
  MdOutlineSettingsInputComponent,
} from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";

const features = [
  {
    icon: MdOutlineNotificationsActive,
    title: "Automated Notifications",
    desc: "Automated notifications and updates regarding shipment status, keeping all parties informed in real-time.",
  },
  {
    icon: BiGlasses,
    title: "Shipment Visibility",
    desc: "End-to-end visibility into shipment status, location, and estimated delivery times.",
  },
  {
    icon: FaUsers,
    title: "Collaboration Tools",
    desc: "Supplier and vendor management features that streamline collaboration and reduce overhead.",
  },
  {
    icon: SiSimpleanalytics,
    title: "Analytics & Reporting",
    desc: "Reporting and analytics capabilities that provide insights into supply chain performance.",
  },
  {
    icon: LuNetwork,
    title: "System Integration",
    desc: "Integration with external systems like ERP and CRM for seamless data exchange.",
  },
  {
    icon: MdOutlineSettingsInputComponent,
    title: "Custom Configuration",
    desc: "Flexible options to tailor the platform to your unique logistics requirements.",
  },
  {
    icon: GiCrossedChains,
    title: "Supply Chain",
    desc: "End-to-end supply chain management tools that synchronise your entire operation.",
  },
];

const AboutClient = () => {
  return (
    <div className="container-xl py-10 lg:py-16 space-y-20">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 lg:p-12 shadow-card">
        <motion.div
          {...inViewProps}
          variants={fadeRight}
          className="lg:w-1/2 flex justify-center"
        >
          <Image
            src="/assets/images/logistics.png"
            alt="Speed Xpress logistics platform"
            width={600}
            height={600}
            className="w-full max-w-sm drop-shadow-xl"
            priority
          />
        </motion.div>

        <motion.div
          {...inViewProps}
          variants={fadeUp}
          className="lg:w-1/2 space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Create an efficient and{" "}
            <span className="text-primary">user-friendly</span> platform for
            managing logistics operations.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            A logistics platform designed to facilitate the management and
            coordination of various logistics activities within a supply chain.
            It serves as a centralised hub where customers, suppliers,
            manufacturers, and logistics providers can access and interact with
            relevant information and tools.
          </p>
        </motion.div>
      </div>

      <div className="space-y-8">
        <motion.h2
          {...inViewProps}
          variants={fadeUp}
          className="text-3xl font-extrabold text-center"
        >
          Platform <span className="text-primary">Features</span>
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 inline-flex rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-base mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutClient;
