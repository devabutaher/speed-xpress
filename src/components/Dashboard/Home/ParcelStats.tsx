"use client";

import { useTranslation } from "@/lib/i18n";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { ParcelType, Status } from "@/types/ParcelType";
import { motion } from "framer-motion";
import { BsBox, BsBoxArrowInRight, BsBoxSeam } from "react-icons/bs";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  unit: string;
  colorClass: string;
  iconBgClass: string;
}

const StatCard = ({
  icon,
  label,
  count,
  unit,
  colorClass,
  iconBgClass,
}: StatCardProps) => (
  <motion.div
    variants={staggerItem}
    className={`space-y-4 rounded-xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 ${colorClass}`}
  >
    <div className={`rounded-2xl p-2.5 inline-flex shadow-md ${iconBgClass}`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
      {label}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">
      <span className="text-3xl font-bold text-gray-900 dark:text-white pr-1">
        {count}
      </span>
      {unit}
    </p>
  </motion.div>
);

const ParcelStats = ({ parcels }: { parcels: ParcelType[] }) => {
  const t = useTranslation();

  const totalDelivered = parcels.filter(
    (p) => p.parcelStatus === Status.Delivered,
  ).length;
  const pendingCount = parcels.filter(
    (p) => p.parcelStatus === Status.Pending,
  ).length;
  const returnedCount = parcels.filter(
    (p) => p.parcelStatus === Status.Returned,
  ).length;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold lg:text-2xl">
        PARCEL <span className="text-primary">SUMMARY</span>
      </h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-5"
      >
        <StatCard
          icon={<BsBoxSeam size={28} className="text-green-600" />}
          label="Total Delivered"
          count={totalDelivered}
          unit="parcels"
          colorClass="bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900"
          iconBgClass="bg-green-200 dark:bg-green-900"
        />
        <StatCard
          icon={<BsBox size={28} className="text-blue-600" />}
          label="Pending Delivery"
          count={pendingCount}
          unit="parcels"
          colorClass="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900"
          iconBgClass="bg-blue-200 dark:bg-blue-900"
        />
        <StatCard
          icon={<BsBoxArrowInRight size={28} className="text-orange-600" />}
          label="Total Returned"
          count={returnedCount}
          unit="parcels"
          colorClass="bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900"
          iconBgClass="bg-orange-200 dark:bg-orange-900"
        />
      </motion.div>
    </div>
  );
};

export default ParcelStats;
