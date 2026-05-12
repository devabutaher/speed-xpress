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

const TrackParcel = () => {
  const t = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [parcel, setParcel] = useState<ParcelType | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
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

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(handleParcel)}
        className="relative flex items-stretch w-full sm:max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="relative flex-1">
          <MdSearch
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            {...register("id", {
              required: "Parcel ID is required",
              pattern: {
                value: /^SX[A-Z0-9]{6}$/,
                message: "Invalid Parcel ID format (e.g. SXABC123)",
              },
            })}
            className={[
              "w-full pl-10 pr-4 py-3.5",
              "border border-r-0 border-solid rounded-l-lg",
              "bg-white/10 dark:bg-white/5 backdrop-blur-sm",
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
