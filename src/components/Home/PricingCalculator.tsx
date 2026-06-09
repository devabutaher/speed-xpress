"use client";

import { weightData } from "@/data/deliveryData";
import { formatCurrency } from "@/lib/utils";
import { calculateParcel } from "@/utils/calculateParcel";
import {
  Chip,
  Divider,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomRadio from "../../ui/CustomRadio";
import {
  fadeLeft,
  fadeRight,
  inViewProps,
  staggerContainer,
  staggerItem,
} from "./../../lib/motion";

// ── Pricing breakdown row ─────────────────────────────────────────────────────
const PriceRow = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className="flex justify-between items-center w-full">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className={`text-sm font-semibold ${className}`}>{value}</span>
  </div>
);

// ── Pricing Calculator ────────────────────────────────────────────────────────
const PricingCalculator = () => {
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

  return (
    <section className="container-xl pb-24">
      {/* ── Section header ── */}
      <motion.div
        {...inViewProps}
        variants={staggerContainer}
        className="text-center space-y-4 mb-12"
      >
        <motion.h2
          variants={staggerItem}
          className="text-3xl md:text-4xl font-extrabold leading-snug"
        >
          Transparent <span className="text-primary">Pricing</span>
        </motion.h2>
        <motion.p
          variants={staggerItem}
          className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
        >
          No hidden fees. Select your parcel details and see exactly what
          you&apos;ll pay — calculated in real-time.
        </motion.p>
      </motion.div>

      {/* ── Grid: Image (top on mobile) + Calculator ── */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* ─── Image (first on mobile, right on desktop) ─── */}
        <motion.div
          {...inViewProps}
          variants={fadeLeft}
          className="md:order-last flex items-center justify-center"
        >
          <Image
            src="./assets/images/pricing_plans.png"
            width={600}
            height={600}
            alt="Speed Xpress pricing plans"
            className="w-full max-w-md drop-shadow-xl"
          />
        </motion.div>

        {/* ─── Calculator ─── */}
        <motion.div {...inViewProps} variants={fadeRight}>
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-card">
            {/* Weight */}
            <div className="space-y-2 mb-5">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Weight
              </label>

              <Select
                disallowEmptySelection
                defaultSelectedKeys={["1"]}
                selectedKeys={[weight]}
                variant="bordered"
                radius="sm"
                size="sm"
                onChange={(e) => setWeight(e.target.value)}
              >
                {weightData.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Delivery Zone */}
            <div className="space-y-2 mb-5">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Delivery Zone
              </label>
              <div className="flex gap-2">
                <Chip
                  variant={division === "Dhaka" ? "solid" : "bordered"}
                  color="primary"
                  className="cursor-pointer"
                  onClick={() => setDivision("Dhaka")}
                >
                  Inside Dhaka
                </Chip>
                <Chip
                  variant={division !== "Dhaka" ? "solid" : "bordered"}
                  color="primary"
                  className="cursor-pointer"
                  onClick={() => setDivision("Other")}
                >
                  Outside Dhaka
                </Chip>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-5">
              <RadioGroup
                label="Shipping Method"
                defaultValue="standard"
                value={shippingMethod}
                onValueChange={setShippingMethod}
                size="sm"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <CustomRadio
                    description="3 to 5 business days"
                    value="standard"
                  >
                    Standard
                  </CustomRadio>
                  <CustomRadio description="Next business day" value="express">
                    Express
                  </CustomRadio>
                </div>
              </RadioGroup>
            </div>

            {/* ── Price breakdown ── */}
            <Divider className="my-4" />
            <div className="space-y-3">
              <PriceRow
                label="Shipping Fee"
                value={formatCurrency(summary.shippingFee, "BDT")}
              />
              <PriceRow
                label={`Weight Charge (${weight} kg × ৳10/kg)`}
                value={formatCurrency(summary.weightCharge, "BDT")}
              />
              <Divider />
              <PriceRow
                label="Sub Total"
                value={formatCurrency(summary.subTotal, "BDT")}
              />
              <PriceRow
                label="Discount (5%)"
                value={`− ${formatCurrency(summary.discount, "BDT")}`}
                className="text-danger"
              />
              <PriceRow
                label="Tax (5%)"
                value={`+ ${formatCurrency(summary.tax, "BDT")}`}
              />
              <Divider />
              <div className="flex justify-between items-center pt-1">
                <span className="text-base font-bold">Estimated Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(summary.estimatedTotal, "BDT")}
                </span>
              </div>
            </div>

            <div className="mt-5 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                🚚 Flat shipping rate — no surprises! Want to create a
                parcel?{" "}
              </span>
              <a
                href="/create-parcel"
                className="text-xs text-primary font-semibold hover:underline"
              >
                Try it now →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCalculator;
