"use client";

import { useTranslation } from "@/lib/i18n";
import { ParcelType } from "@/types/ParcelType";
import { getSingleParcel } from "@/utils/api/parcel";
import { useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import { toast } from "react-toastify";
import TrackingModal from "./TrackingModal";

interface TrackForm {
  id: string;
}

const DEMO_ID = "SX69845A";

const TrackParcel = () => {
  const t = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [parcel, setParcel] = useState<ParcelType | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TrackForm>();

  const handleParcel = async ({ id }: TrackForm) => {
    setIsSearching(true);
    try {
      const response = await getSingleParcel(id);
      if (response.code === "success" && response.data) {
        setParcel(response.data);
        onOpen();
      } else {
        setParcel(null);
        toast.error("Parcel not found. Please check the ID and try again.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleDemo = () => {
    setValue("id", DEMO_ID);
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(handleParcel)}
        className="relative w-full sm:max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-stretch">
          <div className="relative flex-1">
            <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </div>
            <input
              {...register("id", {
                required: "Parcel ID is required",
                pattern: {
                  value: /^SX[A-Z0-9]{6}$/,
                  message: "Invalid Parcel ID format (e.g. SX5ABF76)",
                },
              })}
              className={[
                "w-full pl-10 pr-4 py-3.5",
                "border border-r-0 border-solid rounded-l-lg",
                "bg-white dark:bg-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "placeholder:text-gray-400 text-sm",
                "transition-colors duration-200",
                errors.id
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600",
              ].join(" ")}
              placeholder={t.home.hero.trackPlaceholder}
              type="text"
              autoComplete="off"
            />
            {errors.id && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 left-0 text-xs text-red-500"
              >
                {errors.id.message}
              </motion.p>
            )}

            {/* Demo ID inline suffix */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1">
              <button
                type="button"
                onClick={handleDemo}
                className="pointer-events-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-medium transition-colors cursor-pointer"
              >
                <span className="opacity-60">Try</span>
                <span className="font-mono font-semibold">{DEMO_ID}</span>
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSearching}
            whileTap={{ scale: 0.97 }}
            className={[
              "px-5 py-3.5 rounded-r-lg",
              "bg-primary hover:bg-blue-600 active:bg-blue-700",
              "text-white text-sm font-medium whitespace-nowrap",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "flex items-center gap-2",
            ].join(" ")}
          >
            {isSearching ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <MdSearch size={18} />
            )}
            <span className="hidden sm:inline">{t.home.hero.trackButton}</span>
          </motion.button>
        </div>
      </motion.form>

      <TrackingModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        parcel={parcel}
      />
    </>
  );
};

export default TrackParcel;
