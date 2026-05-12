"use client";

import { staggerContainer, staggerItem } from "@/lib/motion";
import { UserType } from "@/types/UserType";
import { Divider, Snippet } from "@nextui-org/react";
import { motion } from "framer-motion";

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

const UserDetails = ({ user }: { user: UserType }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-5"
    >
      {/* User info */}
      <InfoCard title="User Info">
        <Field label="Name" value={user?.name} />
        <Field label="Email" value={user?.email} mono />
        <div className="space-y-0.5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Role</p>
          <p className="text-sm font-bold uppercase text-primary">
            {user?.role ?? "—"}
          </p>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            User ID
          </p>
          <Snippet variant="flat" radius="sm" symbol="" size="sm">
            {user?._id ?? "—"}
          </Snippet>
        </div>
      </InfoCard>

      {/* Address info */}
      <InfoCard title="User Address">
        <Field label="Division" value={user?.division} />
        <Field label="District" value={user?.district} />
        <Field label="Address" value={user?.address} />
      </InfoCard>
    </motion.div>
  );
};

export default UserDetails;
