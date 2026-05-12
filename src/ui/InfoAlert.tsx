"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdClose, MdInfoOutline } from "react-icons/md";

interface InfoAlertProps {
  message: string;
  variant?: "info" | "success" | "warning" | "danger";
}

const VARIANT_STYLES = {
  info: "bg-blue-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-white",
  danger: "bg-red-500 text-white",
} as const;

const InfoAlert = ({ message, variant = "info" }: InfoAlertProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.2 }}
          role="alert"
          className={[
            "flex items-start justify-between gap-3 px-4 py-3 rounded-xl",
            "max-sm:w-full sm:min-w-[25rem] lg:min-w-[40rem]",
            VARIANT_STYLES[variant],
          ].join(" ")}
        >
          <div className="flex items-start gap-3">
            <MdInfoOutline size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Info</p>
              <p className="text-sm capitalize mt-0.5">{message}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            className="shrink-0 p-0.5 rounded hover:opacity-75 transition-opacity"
          >
            <MdClose size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoAlert;
