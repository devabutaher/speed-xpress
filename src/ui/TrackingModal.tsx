"use client";

import { cn } from "@/lib/utils";
import { TrackingModalType } from "@/types/ModalType";
import { Status } from "@/types/ParcelType";
import {
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Progress,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  MdCheck,
  MdCancel,
  MdDirectionsBike,
  MdLocalShipping,
  MdOutlineCreateNewFolder,
  MdOutlineWarehouse,
} from "react-icons/md";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

// ── Tracking step config ──────────────────────────────────────────────────────
const STEPS = [
  { status: Status.Pending, icon: MdOutlineCreateNewFolder, label: "Created" },
  { status: Status.Accepted, icon: MdOutlineWarehouse, label: "Accepted" },
  { status: Status.Picked, icon: MdDirectionsBike, label: "Picked Up" },
  { status: Status.Delivered, icon: MdCheck, label: "Delivered" },
  { status: Status.Canceled, icon: MdCancel, label: "Cancelled" },
] as const;

const STATUS_PROGRESS: Partial<Record<Status, number>> = {
  [Status.Pending]: 25,
  [Status.Accepted]: 45,
  [Status.Picked]: 65,
  [Status.Delivered]: 100,
  [Status.Canceled]: 100,
};

// ── Sub-components ────────────────────────────────────────────────────────────
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="space-y-1">
    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label}
    </p>
    <div className="font-medium capitalize">{value ?? "—"}</div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const TrackingModal = ({ onOpenChange, isOpen, parcel }: TrackingModalType) => {
  let date = "";
  let time = "";

  if (parcel?.deliveryDateTime) {
    [date, time] = parcel.deliveryDateTime.split(", ");
  }

  const progressValue = parcel?.parcelStatus
    ? (STATUS_PROGRESS[parcel.parcelStatus] ?? 0)
    : 0;

  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={{
        variants: {
          enter: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
          exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
        },
      }}
      classNames={{
        base: "rounded-2xl",
        backdrop: "backdrop-blur-sm",
      }}
    >
      <ModalContent className="p-2">
        {(onClose) => (
          <>
            {/* ── Header ── */}
            <ModalHeader className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <div>
                <p className="text-xs text-gray-500 font-normal">Parcel ID</p>
                <p className="text-base font-bold font-mono">
                  {parcel?.parcelId ?? "—"}
                </p>
              </div>
              {date && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-normal">Date</p>
                  <p className="text-sm font-semibold">{date}</p>
                </div>
              )}
            </ModalHeader>

            <ModalBody className="gap-4 pb-4">
              <Divider />

              {/* ── Progress bar ── */}
              <div className="space-y-3">
                <Progress
                  isStriped
                  aria-label="Delivery progress"
                  color="primary"
                  value={progressValue}
                  className="w-full"
                  size="sm"
                />

                {/* ── Step icons ── */}
                <div className="flex justify-between px-1">
                  {STEPS.map(({ status, icon: Icon, label }) => {
                    const isActive =
                      progressValue >= (STATUS_PROGRESS[status as Status] ?? 0);
                    return (
                      <motion.div
                        key={status}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className={cn(
                            "p-2 rounded-full transition-colors duration-300",
                            isActive
                              ? "bg-primary text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-400",
                          )}
                        >
                          <Icon size={20} />
                        </div>
                        <span className="text-xs text-gray-500 hidden sm:block">
                          {label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Divider />

              {/* ── Parcel details grid ── */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <DetailRow label="Sender" value={parcel?.senderInfo?.name} />
                <DetailRow
                  label="Receiver"
                  value={parcel?.recipientInfo?.name}
                />
                <DetailRow
                  label="From"
                  value={parcel?.senderInfo?.address?.district}
                />
                <DetailRow
                  label="To"
                  value={parcel?.recipientInfo?.address?.district}
                />
                <DetailRow
                  label="Payment"
                  value={parcel?.paymentInfo?.method}
                />
                <DetailRow
                  label="Amount"
                  value={
                    parcel?.paymentInfo?.amount != null
                      ? `৳${parcel.paymentInfo.amount}`
                      : null
                  }
                />
                <DetailRow
                  label="Status"
                  value={
                    <Chip
                      variant="flat"
                      color="primary"
                      size="sm"
                      className="capitalize"
                    >
                      {parcel?.parcelStatus ?? "—"}
                    </Chip>
                  }
                />
                <DetailRow
                  label="Shipping"
                  value={
                    <Chip variant="flat" size="sm" className="capitalize">
                      {parcel?.shippingMethod ?? "—"}
                    </Chip>
                  }
                />
              </div>

              <Divider />

              {/* ── Footer ── */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {time && (
                  <p className="text-sm">
                    <span className="text-gray-500">Time: </span>
                    <span className="font-semibold">{time}</span>
                  </p>
                )}
                <div className="flex gap-2 ml-auto">
                  <SecondaryButton size="sm" onClick={onClose}>
                    Close
                  </SecondaryButton>
                  <PrimaryButton
                    size="sm"
                    href={`/parcels/${parcel?.parcelId}`}
                  >
                    <MdLocalShipping className="mr-1" />
                    Details
                  </PrimaryButton>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TrackingModal;
