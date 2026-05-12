"use client";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTranslation } from "@/lib/i18n";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Loading from "@/ui/Loading";
import { motion } from "framer-motion";

const Field = ({ label, value }: { label: string; value?: string | null }) => (
  <motion.div variants={staggerItem} className="space-y-1">
    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label}
    </p>
    <p className="text-base font-medium capitalize">{value || "—"}</p>
  </motion.div>
);

const ProfileInfo = () => {
  const t = useTranslation();
  const { isLoading, userInfo } = useUserInfo();

  if (isLoading)
    return (
      <div className="grid place-items-center h-40">
        <Loading size="lg" />
      </div>
    );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid sm:grid-cols-2 gap-6"
    >
      <Field label={t.common.name} value={userInfo?.name} />
      <Field label={t.common.email} value={userInfo?.email} />
      <Field label={t.common.phone} value={userInfo?.number} />
      <Field label={t.common.address} value={userInfo?.address} />
      <Field label="Division" value={userInfo?.division} />
      <Field label="District" value={userInfo?.district} />
      <motion.div variants={staggerItem} className="space-y-1">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Account type
        </p>
        <p className="text-base font-bold uppercase text-primary">
          {userInfo?.role}
        </p>
      </motion.div>
    </motion.div>
  );
};
export default ProfileInfo;
