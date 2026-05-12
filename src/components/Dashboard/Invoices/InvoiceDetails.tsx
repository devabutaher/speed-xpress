"use client";

import { staggerContainer, staggerItem } from "@/lib/motion";
import { formatCurrency } from "@/lib/utils";
import { InvoiceType } from "@/types/invoiceType";
import { Chip, Divider, Snippet } from "@nextui-org/react";
import { motion } from "framer-motion";

// ── Shared field primitive (mirrors ParcelDetails) ────────────────────────────
const Field = ({
  label,
  value,
  mono = false,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
}) => (
  <div className="space-y-0.5">
    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label}
    </p>
    <p
      className={`text-base font-medium capitalize ${mono ? "font-mono normal-case" : ""}`}
    >
      {value || "—"}
    </p>
  </div>
);

const InfoCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    variants={staggerItem}
    className="space-y-4 p-6 sm:p-8 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl"
  >
    <h2 className="text-base font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
      {title}
    </h2>
    <Divider />
    <div className="space-y-4">{children}</div>
  </motion.div>
);

// ── Main component ────────────────────────────────────────────────────────────
const InvoiceDetails = ({ invoiceData }: { invoiceData: InvoiceType }) => {
  const [date, time] = (invoiceData?.paymentDateTime ?? "").split(", ");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-5"
    >
      {/* User info */}
      <InfoCard title="User Info">
        <Field label="Name" value={invoiceData?.userName} />
        <Field label="Email" value={invoiceData?.userEmail} mono />
        <div className="space-y-0.5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Role</p>
          <p className="text-sm font-bold uppercase text-primary">
            {invoiceData?.userRole ?? "—"}
          </p>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Parcel ID
          </p>
          <Snippet variant="flat" radius="sm" symbol="" size="sm">
            {invoiceData?.parcelId ?? "—"}
          </Snippet>
        </div>
      </InfoCard>

      {/* Payment info */}
      <InfoCard title="Payment Info">
        <div className="space-y-0.5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Invoice ID
          </p>
          <Snippet variant="flat" radius="sm" symbol="" size="sm">
            {invoiceData?.invoiceId ?? "—"}
          </Snippet>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Date" value={date} />
          <Field label="Time" value={time} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-0.5">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Method
            </p>
            <Chip variant="flat" size="sm" className="capitalize">
              {invoiceData?.paymentMethod ?? "—"}
            </Chip>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Status
            </p>
            <Chip
              variant="flat"
              color={invoiceData?.status === "paid" ? "success" : "default"}
              size="sm"
              className="capitalize"
            >
              {invoiceData?.status ?? "—"}
            </Chip>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-0.5">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Currency
            </p>
            <p className="text-sm font-bold uppercase">
              {invoiceData?.currency ?? "—"}
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Amount
            </p>
            {/* Was hardcoded "$" — now uses proper BDT formatting */}
            <p className="text-xl font-bold text-primary">
              {formatCurrency(invoiceData?.amount ?? 0, "BDT")}
            </p>
          </div>
        </div>
      </InfoCard>
    </motion.div>
  );
};

export default InvoiceDetails;
