"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getDashboardPath } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { formatCurrency } from "@/lib/utils";
import StripeProvider from "@/providers/StripeProvider";
import { ParcelSummaryType } from "@/types/ParcelType";
import { calculateParcel } from "@/utils/calculateParcel";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ParcelForm from "./ParcelForm";

// ── Parcel Summary sub-component ──────────────────────────────────────────────
const SummaryRow = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className="flex justify-between items-center w-full">
    <p className={`text-base text-gray-500 dark:text-gray-400 ${className}`}>
      {label}
    </p>
    <p className={`text-base font-semibold ${className}`}>{value}</p>
  </div>
);

const ParcelSummary = ({
  shippingFee,
  weightCharge,
  discount,
  subTotal,
  tax,
  estimatedTotal,
}: ParcelSummaryType) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="space-y-6"
  >
    <h2 className="font-bold text-xl">
      PARCEL <span className="text-primary">SUMMARY</span>
    </h2>

    <motion.div variants={staggerItem} className="space-y-4">
      <SummaryRow
        label="Shipping Fee"
        value={formatCurrency(shippingFee, "BDT")}
      />
      <SummaryRow
        label="Weight Charge"
        value={formatCurrency(weightCharge, "BDT")}
      />
      <SummaryRow
        label="Discount 5%"
        value={`− ${formatCurrency(discount, "BDT")}`}
        className="text-danger"
      />
    </motion.div>

    <Divider />

    <motion.div variants={staggerItem} className="space-y-4">
      <SummaryRow label="Sub Total" value={formatCurrency(subTotal, "BDT")} />
      <SummaryRow label="Tax 5%" value={`+ ${formatCurrency(tax, "BDT")}`} />
    </motion.div>

    <Divider />

    <motion.div
      variants={staggerItem}
      className="flex justify-between items-center pt-2"
    >
      <p className="text-lg font-bold">Estimated Total</p>
      <p className="text-2xl font-bold text-primary">
        {formatCurrency(estimatedTotal, "BDT")}
      </p>
    </motion.div>
  </motion.div>
);

// ── Main CreateParcel component ───────────────────────────────────────────────
const CreateParcel = () => {
  const t = useTranslation();
  const { userInfo, isLoading } = useUserInfo();
  const { role } = useAuth();

  const [division, setDivision] = useState("Dhaka");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [weight, setWeight] = useState("1");
  const [summary, setSummary] = useState({
    shippingFee: 0,
    weightCharge: 0,
    subTotal: 0,
    discount: 0,
    tax: 0,
    estimatedTotal: 0,
  });

  useEffect(() => {
    setSummary(calculateParcel(division, shippingMethod, weight));
  }, [division, shippingMethod, weight]);

  const profilePath = getDashboardPath(role, "/profile");

  return (
    <StripeProvider>
      <div className="container-xl py-10 lg:py-16">
        {/* Profile incomplete warning */}
        {!isLoading && !userInfo?.address && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card radius="sm">
              <CardBody className="bg-warning-50 dark:bg-warning-900/20">
                <p className="text-sm">
                  ⚠️ Please complete your profile before creating a parcel.{" "}
                  <Link
                    href={profilePath}
                    className="text-primary font-semibold hover:underline"
                  >
                    Go to Profile →
                  </Link>
                </p>
              </CardBody>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form — left col */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeRight}
            className="lg:col-span-3 space-y-6"
          >
            <h1 className="font-bold text-3xl lg:text-4xl">
              CREATE <span className="text-primary">PARCEL</span>
            </h1>
            <Divider />
            <ParcelForm
              shippingMethod={shippingMethod}
              division={division}
              setShippingMethod={setShippingMethod}
              setDivision={setDivision}
              setWeight={setWeight}
              weight={weight}
              estimatedTotal={summary.estimatedTotal}
              userInfo={userInfo}
            />
          </motion.div>

          {/* Summary — right sticky col */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeLeft}
            className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 lg:p-8 lg:sticky lg:top-20"
          >
            <ParcelSummary {...summary} />
          </motion.div>
        </div>
      </div>
    </StripeProvider>
  );
};

export default CreateParcel;
