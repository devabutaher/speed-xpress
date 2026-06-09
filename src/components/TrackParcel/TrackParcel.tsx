"use client";

import { getSingleParcel } from "@/utils/api/parcel";
import {
  Chip,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCheckCircle, MdLocalShipping, MdPending } from "react-icons/md";

// ── Parcel type ───────────────────────────────────────────────────────────────
type ParcelData = {
  _id?: string;
  parcelId?: string;
  senderInfo?: {
    name: string;
    email: string;
    number: string;
    address: { division: string; district: string; address: string };
  };
  recipientInfo?: {
    name: string;
    email: string;
    number: string;
    address: { division: string; district: string; address: string };
  };
  parcelWeight?: string;
  parcelQuantity?: string;
  shippingMethod?: string;
  parcelStatus?: string;
  deliveryDateTime?: string;
  paymentInfo?: {
    method: string;
    status: string;
    amount: number;
  };
  description?: string;
};

// ── Status step config ────────────────────────────────────────────────────────
const STEPS = [
  { key: "pending", label: "Pending", icon: MdPending },
  { key: "accepted", label: "Accepted", icon: MdCheckCircle },
  { key: "picked", label: "Picked Up", icon: MdLocalShipping },
  { key: "delivered", label: "Delivered", icon: MdCheckCircle },
];

const STATUS_ORDER = ["pending", "accepted", "picked", "delivered"];

// ── Status Badge color ────────────────────────────────────────────────────────
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

// ── Info Card ─────────────────────────────────────────────────────────────────
const InfoCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4 p-6 sm:p-8 dark:bg-gray-900 bg-gray-200 rounded-xl">
    <h2 className="text-lg font-bold uppercase tracking-wide text-primary">
      {title}
    </h2>
    <Divider />
    {children}
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label}
    </p>
    <p className="text-base sm:text-lg font-medium capitalize">{value || "—"}</p>
  </div>
);

// ── TrackParcel Component ─────────────────────────────────────────────────────
const TrackParcel = () => {
  const { parcelId } = useParams<{ parcelId: string }>();
  const [parcel, setParcel] = useState<ParcelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!parcelId) return;

    const fetchParcel = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getSingleParcel(parcelId);
        if (res.code === "success" && res.data) {
          setParcel(res.data);
        } else {
          setError("Parcel not found. Please check your Parcel ID.");
        }
      } catch {
        setError("Failed to load parcel. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchParcel();
  }, [parcelId]);

  const currentStep = STATUS_ORDER.indexOf(parcel?.parcelStatus ?? "pending");

  // ── Loading state ──
  if (loading) {
    return (
      <div className="container-xl min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" label="Loading parcel..." />
      </div>
    );
  }

  // ── Error state ──
  if (error || !parcel) {
    return (
      <div className="container-xl min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-6xl">📦</div>
        <h1 className="text-2xl font-bold">Parcel Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {error || "We couldn&apos;t find a parcel with that ID."}
        </p>
        <Link
          href="/create-parcel"
          className="text-primary font-semibold hover:underline"
        >
          Create a new parcel →
        </Link>
      </div>
    );
  }

  const [date, time] = (parcel?.deliveryDateTime ?? ", ").split(", ");

  return (
    <section className="container-xl py-10 lg:py-16">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 mb-12"
      >
        <div className="text-5xl">📦</div>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Track Your <span className="text-primary">Parcel</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Parcel ID:{" "}
          <span className="font-mono font-bold text-primary">
            {parcel?.parcelId}
          </span>
        </p>
      </motion.div>

      {/* ── Status Timeline ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto mb-12 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => {
            const isCompleted = idx <= currentStep;
            const isCurrent = idx === currentStep;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center flex-1">
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
                {/* Connector line */}
                {idx < STEPS.length - 1 && (
                  <div
                    className={`hidden sm:block absolute translate-x-7 w-[calc(100%-3.5rem)] h-0.5 top-5 -z-10 ${
                      idx < currentStep
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Current status chip */}
        <div className="text-center mt-6">
          <Chip
            color={statusColor(parcel?.parcelStatus)}
            variant="flat"
            size="lg"
          >
            <span className="font-semibold capitalize">
              {parcel?.parcelStatus}
            </span>
          </Chip>
          {parcel?.shippingMethod && (
            <Chip variant="bordered" size="sm" className="ml-2">
              {parcel.shippingMethod === "express" ? "🚀 Express" : "Standard"}
            </Chip>
          )}
        </div>
      </motion.div>

      {/* ── Details Grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-4 lg:gap-6"
      >
        {/* Sender Info */}
        {parcel?.senderInfo && (
          <InfoCard title="Sender Info">
            <InfoRow label="Name" value={parcel.senderInfo.name} />
            <InfoRow label="Email" value={parcel.senderInfo.email} />
            <InfoRow label="Phone" value={parcel.senderInfo.number} />
            <div className="flex gap-4">
              <InfoRow
                label="Division"
                value={parcel.senderInfo.address?.division}
              />
              <InfoRow
                label="District"
                value={parcel.senderInfo.address?.district}
              />
            </div>
          </InfoCard>
        )}

        {/* Recipient Info */}
        <InfoCard title="Recipient Info">
          <InfoRow label="Name" value={parcel?.recipientInfo?.name ?? ""} />
          <InfoRow label="Email" value={parcel?.recipientInfo?.email ?? ""} />
          <InfoRow label="Phone" value={parcel?.recipientInfo?.number ?? ""} />
          <div className="flex gap-4">
            <InfoRow
              label="Division"
              value={parcel?.recipientInfo?.address?.division ?? ""}
            />
            <InfoRow
              label="District"
              value={parcel?.recipientInfo?.address?.district ?? ""}
            />
          </div>
        </InfoCard>

        {/* Parcel Info */}
        <InfoCard title="Parcel Info">
          <InfoRow label="Parcel ID" value={parcel?.parcelId ?? ""} />
          <div className="flex gap-4">
            <InfoRow
              label="Weight"
              value={parcel?.parcelWeight ? `${parcel.parcelWeight} KG` : "—"}
            />
            <InfoRow
              label="Quantity"
              value={
                parcel?.parcelQuantity ? `${parcel.parcelQuantity} PCS` : "—"
              }
            />
          </div>
          <div className="flex gap-4">
            <InfoRow label="Date" value={date ?? ""} />
            <InfoRow label="Time" value={time ?? ""} />
          </div>
          <InfoRow
            label="Delivery Method"
            value={
              parcel?.shippingMethod === "express"
                ? "🚀 Express Shipping"
                : "Standard Shipping"
            }
          />
          {parcel?.description && (
            <InfoRow label="Description" value={parcel.description} />
          )}
        </InfoCard>

        {/* Payment Info */}
        <InfoCard title="Payment Info">
          <InfoRow
            label="Method"
            value={
              parcel?.paymentInfo?.method === "online"
                ? "💳 Online Payment"
                : "💵 Cash on Delivery"
            }
          />
          {/* Use formatCurrency where available */}
          {parcel?.paymentInfo?.amount != null && (
            <InfoRow
              label="Amount"
              value={`৳${parcel.paymentInfo.amount.toFixed(2)}`}
            />
          )}
          <InfoRow
            label="Payment Status"
            value={parcel?.paymentInfo?.status ?? "—"}
          />
          <div className="mt-2">
            <Chip
              color={
                parcel?.paymentInfo?.status === "paid"
                  ? "success"
                  : "warning"
              }
              variant="flat"
              size="sm"
            >
              <span className="font-semibold capitalize">
                {parcel?.paymentInfo?.status === "paid" ? "✅ Paid" : "⏳ Pending"}
              </span>
            </Chip>
          </div>
        </InfoCard>
      </motion.div>

      {/* ── Footer CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12 space-y-4"
      >
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
      </motion.div>
    </section>
  );
};

export default TrackParcel;
