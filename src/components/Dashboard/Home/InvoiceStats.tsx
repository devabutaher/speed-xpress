"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { formatCurrency } from "@/lib/utils";
import { PaymentStatus } from "@/types/ParcelType";
import { motion } from "framer-motion";
import { BsBox, BsBoxArrowInRight, BsBoxSeam } from "react-icons/bs";

const InvoiceStats = () => {
  const { invoices } = useInvoice();

  const totalAmount = invoices.reduce((sum, inv) => sum + (inv.amount ?? 0), 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === PaymentStatus.Pending)
    .reduce((sum, inv) => sum + (inv.amount ?? 0), 0);
  const cancelledAmount = invoices
    .filter((inv) => inv.status === PaymentStatus.Canceled)
    .reduce((sum, inv) => sum + (inv.amount ?? 0), 0);

  const cards = [
    {
      icon: <BsBoxSeam size={28} className="text-green-600" />,
      label: "Total Payment",
      value: formatCurrency(totalAmount, "BDT"),
      colorClass:
        "bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900",
      iconBgClass: "bg-green-200 dark:bg-green-900",
    },
    {
      icon: <BsBox size={28} className="text-blue-600" />,
      label: "Pending Payment",
      value: formatCurrency(pendingAmount, "BDT"),
      colorClass:
        "bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900",
      iconBgClass: "bg-blue-200 dark:bg-blue-900",
    },
    {
      icon: <BsBoxArrowInRight size={28} className="text-orange-600" />,
      label: "Cancelled Amount",
      value: formatCurrency(cancelledAmount, "BDT"),
      colorClass:
        "bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900",
      iconBgClass: "bg-orange-200 dark:bg-orange-900",
    },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold lg:text-2xl">
        INVOICE <span className="text-primary">SUMMARY</span>
      </h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-5"
      >
        {cards.map(({ icon, label, value, colorClass, iconBgClass }) => (
          <motion.div
            key={label}
            variants={staggerItem}
            className={`space-y-4 rounded-xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 ${colorClass}`}
          >
            <div
              className={`rounded-2xl p-2.5 inline-flex shadow-md ${iconBgClass}`}
            >
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {label}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InvoiceStats;
