"use client";

import ParcelDetails from "@/components/Dashboard/Parcels/ParcelDetails";
import useSingleParcel from "@/hooks/useSingleParcel";
import Loading from "@/ui/Loading";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { Chip, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  MdCheckCircle,
  MdLocalShipping,
  MdPending,
} from "react-icons/md";

// ── Status step config ────────────────────────────────────────────────────────
const STEPS = [
  { key: "pending", label: "Pending", icon: MdPending },
  { key: "accepted", label: "Accepted", icon: MdCheckCircle },
  { key: "picked", label: "Picked Up", icon: MdLocalShipping },
  { key: "delivered", label: "Delivered", icon: MdCheckCircle },
];

const STATUS_ORDER = ["pending", "accepted", "picked", "delivered"];

const statusColor = (status: string | undefined) => {
  switch (status) {
    case "delivered":
      return "success";
    case "accepted":
    case "picked":
      return "primary";
    case "canceled":
    case "returned":
      return "danger";
    default:
      return "warning";
  }
};

interface ParcelDetailsPageProps {
  params: { id: string };
}

const ParcelDetailsPage = ({ params }: ParcelDetailsPageProps) => {
  const { data, isLoading, error } = useSingleParcel(params.id);
  const router = useRouter();
  const parcelRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => parcelRef.current,
    documentTitle: `Parcel-${params.id}`,
  });

  const currentStep = STATUS_ORDER.indexOf(data?.parcelStatus ?? "pending");

  return (
    <div className="container-xl py-10 lg:py-16 space-y-8">
      {/* ── Loading ── */}
      {isLoading && (
        <div className="grid place-items-center py-40">
          <Loading size="lg" />
        </div>
      )}

      {/* ── Error ── */}
      {!isLoading && error && (
        <div className="grid place-items-center gap-4 py-20 text-center">
          <div className="text-6xl">📦</div>
          <h2 className="text-2xl font-bold">Parcel Not Found</h2>
          <p className="text-sm text-gray-500">
            The parcel ID{" "}
            <span className="font-mono font-bold">{params.id}</span> was not
            found.
          </p>
          <Link
            href="/create-parcel"
            className="text-primary font-semibold hover:underline mt-2"
          >
            Create a new parcel →
          </Link>
        </div>
      )}

      {/* ── Data ── */}
      {!isLoading && data && (
        <>
          {/* ── Header ── */}
          <div className="flex flex-wrap justify-between gap-4 items-center">
            <div>
              <h1 className="font-bold text-3xl lg:text-4xl">
                Track Your <span className="text-primary">Parcel</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Parcel ID:{" "}
                <span className="font-mono font-bold text-primary">
                  {data?.parcelId}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <SecondaryButton size="sm" onClick={() => router.back()}>
                ← Back
              </SecondaryButton>
              {data && (
                <PrimaryButton size="sm" onClick={handlePrint}>
                  Download PDF
                </PrimaryButton>
              )}
            </div>
          </div>

          <Divider />

          {/* ── Status Timeline ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between relative">
              {STEPS.map((step, idx) => {
                const isCompleted = idx <= currentStep;
                const isCurrent = idx === currentStep;
                const Icon = step.icon;

                return (
                  <div
                    key={step.key}
                    className="flex flex-col items-center flex-1 relative"
                  >
                    {/* Connector line */}
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`hidden sm:block absolute left-1/2 w-full h-1 top-4 -z-10 ${
                          idx < currentStep
                            ? "bg-primary"
                            : "bg-gray-300 dark:bg-gray-700"
                        }`}
                      />
                    )}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                        isCompleted
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500"
                      } ${isCurrent ? "ring-4 ring-primary/30 scale-110" : ""}`}
                    >
                      <Icon />
                    </div>
                    <p
                      className={`text-xs mt-2 font-medium text-center ${
                        isCompleted
                          ? "text-primary"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-6">
              <Chip
                color={statusColor(data?.parcelStatus)}
                variant="flat"
                size="lg"
              >
                <span className="font-semibold capitalize">
                  {data?.parcelStatus === "delivered"
                    ? "✅ Delivered"
                    : data?.parcelStatus === "accepted"
                      ? "📋 Accepted"
                      : data?.parcelStatus === "picked"
                        ? "📦 Picked Up"
                        : "⏳ Pending"}
                </span>
              </Chip>
              {data?.shippingMethod && (
                <Chip variant="bordered" size="sm" className="ml-2">
                  {data.shippingMethod === "express"
                    ? "🚀 Express"
                    : "Standard"}
                </Chip>
              )}
            </div>
          </motion.div>

          {/* ── Parcel Details (printable) ── */}
          <div ref={parcelRef} className="print:px-8 print:py-6">
            {/* Print-only header */}
            <div className="hidden print:block mb-6">
              <h1 className="text-2xl font-extrabold">
                SPEED<span className="text-primary">XPRESS</span>
              </h1>
              <p className="text-sm text-gray-500">
                Parcel Details — {params.id}
              </p>
              {/* Print-only status */}
              <div className="mt-2 text-sm">
                Status:{" "}
                <span className="font-semibold capitalize">
                  {data?.parcelStatus}
                </span>
              </div>
            </div>
            <ParcelDetails parcelData={data} />
          </div>

          {/* ── Footer CTA ── */}
          <div className="text-center pt-4 space-y-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Have questions about your parcel?{" "}
              <Link
                href="/contact-us"
                className="text-primary font-medium hover:underline"
              >
                Contact us
              </Link>
            </p>
            <Link
              href="/create-parcel"
              className="inline-block text-primary font-semibold hover:underline"
            >
              📦 Send another parcel →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ParcelDetailsPage;
