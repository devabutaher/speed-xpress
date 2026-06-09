"use client";

import dynamic from "next/dynamic";
import InvoiceStats from "@/components/Dashboard/Home/InvoiceStats";
import ParcelStats from "@/components/Dashboard/Home/ParcelStats";
import { useAuth } from "@/hooks/useAuth";
import { useParcel } from "@/hooks/useParcel";
import { useTranslation } from "@/lib/i18n";
import { staggerContainer, staggerItem } from "@/lib/motion";
import ErrorAlert from "@/ui/ErrorAlert";
import { motion } from "framer-motion";

// Dynamic imports for chart.js (heavy ~60KB) — loaded only when dashboard mounts
const LineChart = dynamic(
  () => import("@/components/Dashboard/Home/LineChart"),
  {
    ssr: false,
    loading: () => (
      <div className="skeleton h-64 rounded-xl" />
    ),
  }
);

const PieChart = dynamic(
  () => import("@/components/Dashboard/Home/PieChart"),
  {
    ssr: false,
    loading: () => (
      <div className="skeleton h-64 w-64 rounded-xl" />
    ),
  }
);

const DashboardPage = () => {
  const t = useTranslation();
  const { user } = useAuth();
  const { parcels, isLoading, isError, error, refetch } = useParcel();

  if (isLoading) {
    return (
      <div className="container-xl py-20 space-y-10">
        {/* Skeleton stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32 rounded-xl" />
          ))}
        </div>
        <div className="skeleton h-64 rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="container-xl py-10 lg:py-16 space-y-12"
    >
      {/* Error state */}
      {isError && (
        <motion.div variants={staggerItem}>
          <ErrorAlert
            message={
              error instanceof Error
                ? error.message
                : "Failed to load dashboard data"
            }
            onRetry={() => refetch()}
          />
        </motion.div>
      )}

      {/* Welcome banner */}
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl lg:text-3xl font-bold">
          {t.dashboard.welcome},{" "}
          <span className="text-primary uppercase">
            {user?.displayName ?? user?.email?.split("@")[0] ?? "there"}
          </span>{" "}
          👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Here&apos;s what&apos;s happening with your parcels today.
        </p>
      </motion.div>

      {/* Parcel stats */}
      <motion.div variants={staggerItem}>
        <ParcelStats parcels={parcels} />
      </motion.div>

      {/* Invoice stats */}
      <motion.div variants={staggerItem}>
        <InvoiceStats />
      </motion.div>

      {/* Charts */}
      <motion.div variants={staggerItem} className="space-y-6">
        <h2 className="text-xl font-semibold lg:text-2xl">
          PARCEL <span className="text-primary">CHART</span>
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 min-w-0">
            <LineChart parcels={parcels} />
          </div>
          <div className="shrink-0">
            <PieChart parcels={parcels} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
