"use client";

import { weightData } from "@/data/deliveryData";
import { useTranslation } from "@/lib/i18n";
import { VALIDATION_PATTERNS } from "@/lib/utils";
import {
  ParcelDataType,
  ParcelType,
  PaymentStatus,
  Status,
} from "@/types/ParcelType";
import CustomInput from "@/ui/CustomInput";
import CustomRadio from "@/ui/CustomRadio";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import SelectDistrict from "@/ui/SelectDistrict";
import SelectDivision from "@/ui/SelectDivision";
import { createInvoice, updateInvoiceStatus } from "@/utils/api/invoice";
import { createParcel } from "@/utils/api/parcel";
import { createPayment } from "@/utils/api/payment";
import { RadioGroup, Select, SelectItem, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface GuestParcelFormData extends ParcelDataType {
  senderName: string;
  senderEmail: string;
  senderNumber: string;
  senderAddress: string;
}

interface GuestParcelFormProps {
  division: string;
  setDivision: Dispatch<SetStateAction<string>>;
  shippingMethod: string;
  setShippingMethod: Dispatch<SetStateAction<string>>;
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  senderDivision: string;
  setSenderDivision: Dispatch<SetStateAction<string>>;
  senderDistrict: string;
  setSenderDistrict: Dispatch<SetStateAction<string>>;
  estimatedTotal: number;
}

const GuestParcelForm = ({
  division,
  setDivision,
  shippingMethod,
  setShippingMethod,
  setWeight,
  estimatedTotal,
  senderDivision,
  setSenderDivision,
  senderDistrict,
  setSenderDistrict,
}: GuestParcelFormProps) => {
  const t = useTranslation();
  const router = useRouter();

  const [recipientDistrict, setRecipientDistrict] = useState("Dhaka");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [createdParcelId, setCreatedParcelId] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestParcelFormData>();

  const handleForm = async (data: GuestParcelFormData) => {
    const {
      address,
      email,
      name,
      number,
      quantity,
      weight,
      description,
      senderName,
      senderEmail,
      senderNumber,
      senderAddress,
    } = data;

    // ── Build parcel payload ────────────────────────────────────────────────
    const parcelData: ParcelType = {
      senderInfo: {
        name: senderName,
        email: senderEmail,
        number: senderNumber,
        address: {
          division: senderDivision,
          district: senderDistrict,
          address: senderAddress,
        },
      },
      recipientInfo: {
        name,
        email,
        number,
        address: { division, district: recipientDistrict, address },
      },
      parcelStatus: Status.Pending,
      shippingMethod,
      parcelWeight: weight,
      parcelQuantity: quantity,
      deliveryDateTime: new Date().toLocaleString(),
      paymentInfo: {
        method: paymentMethod,
        status: PaymentStatus.Pending,
        amount: estimatedTotal,
      },
      description,
    };

    // ── Create parcel ───────────────────────────────────────────────────────
    const parcelResponse = await createParcel(parcelData);

    if (parcelResponse.code !== "success") {
      toast.error("Failed to create parcel. Please try again.");
      return;
    }

    const parcelId = parcelResponse.data.parcelId ?? "";
    setCreatedParcelId(parcelId);

    const invoiceBase = {
      userEmail: senderEmail,
      userName: senderName,
      userRole: "regular",
      parcelId,
      paymentMethod,
      amount: estimatedTotal,
      status: PaymentStatus.Pending,
      paymentDateTime: new Date().toLocaleString(),
    };

    // ── Online payment (Stripe) ─────────────────────────────────────────────
    if (paymentMethod === "online") {
      const paymentResponse = await createPayment(invoiceBase);

      if (paymentResponse.code !== "success") {
        toast.error(
          "Payment initiation failed. Your parcel was saved. We've sent you an email with details to pay later.",
        );
        return;
      }

      const updateResponse = await updateInvoiceStatus({
        id: `${paymentResponse.data.id}`,
        data: {
          parcelId: `${parcelResponse.data._id}`,
          status: PaymentStatus.Paid,
        },
      });

      if (updateResponse.code === "success") {
        reset();
        toast.success("✅ Parcel created! Redirecting to payment...");
        setTimeout(() => router.push(`${paymentResponse.data.url}`), 1500);
      } else {
        toast.error("Invoice update failed. Please contact support.");
      }
      return;
    }

    // ── Cash on delivery ────────────────────────────────────────────────────
    const invoiceResponse = await createInvoice(invoiceBase);

    if (invoiceResponse.code === "success") {
      reset();
      toast.success(
        `✅ Parcel created! ID: ${parcelId}. Check your email for tracking details.`,
      );
    } else {
      toast.warn(
        `Parcel created (ID: ${parcelId}) but invoice generation failed.`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className="space-y-5" noValidate>
      {/* ── Sender details ─────────────────────────────────────────────── */}
      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        Sender Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <CustomInput
          label="Sender Name"
          name="senderName"
          register={register}
          error={errors}
          validationRules={{
            required: t.auth.errors.nameRequired,
            minLength: { value: 2, message: t.auth.errors.nameInvalid },
            maxLength: { value: 30, message: t.auth.errors.nameInvalid },
          }}
        />
        <CustomInput
          label={t.common.email}
          name="senderEmail"
          type="email"
          register={register}
          error={errors}
          validationRules={{
            required: t.auth.errors.emailRequired,
            pattern: {
              value: VALIDATION_PATTERNS.email,
              message: t.auth.errors.emailInvalid,
            },
          }}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <CustomInput
          label={t.auth.phoneNumber}
          name="senderNumber"
          register={register}
          error={errors}
          validationRules={{
            required: t.auth.errors.phoneRequired,
            pattern: {
              value: VALIDATION_PATTERNS.phone,
              message: t.auth.errors.phoneInvalid,
            },
            minLength: { value: 7, message: t.auth.errors.phoneInvalid },
            maxLength: { value: 20, message: t.auth.errors.phoneInvalid },
          }}
        />
      </div>

      <div className="flex gap-3">
        <SelectDivision
          division={senderDivision}
          setDivision={setSenderDivision}
          setDistrict={setSenderDistrict}
          variant="bordered"
        />
        <SelectDistrict
          division={senderDivision}
          district={senderDistrict}
          setDistrict={setSenderDistrict}
          variant="bordered"
        />
      </div>
      <CustomInput
        label={t.parcel.form.senderAddress}
        name="senderAddress"
        register={register}
        error={errors}
        validationRules={{ required: t.auth.errors.addressRequired }}
      />

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* ── Recipient details ─────────────────────────────────────────── */}
      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        Recipient Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <CustomInput
          label={t.parcel.form.receiverName}
          name="name"
          register={register}
          error={errors}
          validationRules={{
            required: t.auth.errors.nameRequired,
            minLength: { value: 2, message: t.auth.errors.nameInvalid },
            maxLength: { value: 30, message: t.auth.errors.nameInvalid },
          }}
        />
        <CustomInput
          label={t.common.email}
          name="email"
          type="email"
          register={register}
          error={errors}
          validationRules={{
            required: t.auth.errors.emailRequired,
            pattern: {
              value: VALIDATION_PATTERNS.email,
              message: t.auth.errors.emailInvalid,
            },
          }}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <CustomInput
          label={t.parcel.form.receiverPhone}
          name="number"
          register={register}
          error={errors}
          validationRules={{
            required: t.auth.errors.phoneRequired,
            pattern: {
              value: VALIDATION_PATTERNS.phone,
              message: t.auth.errors.phoneInvalid,
            },
            minLength: { value: 7, message: t.auth.errors.phoneInvalid },
            maxLength: { value: 20, message: t.auth.errors.phoneInvalid },
          }}
        />
      </div>
      <div className="flex gap-3">
        <SelectDivision
          division={division}
          setDivision={setDivision}
          setDistrict={setRecipientDistrict}
          variant="bordered"
        />
        <SelectDistrict
          division={division}
          district={recipientDistrict}
          setDistrict={setRecipientDistrict}
          variant="bordered"
        />
      </div>
      <CustomInput
        label={t.parcel.form.receiverAddress}
        name="address"
        register={register}
        error={errors}
        validationRules={{ required: t.auth.errors.addressRequired }}
      />

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* ── Parcel details ────────────────────────────────────────────── */}
      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide pt-2">
        Parcel Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Weight */}
        <Select
          label={
            <span>
              {t.parcel.form.parcelWeight}{" "}
              <span className="text-danger" aria-hidden="true">
                *
              </span>
            </span>
          }
          {...register("weight", { required: "Weight is required" })}
          disallowEmptySelection
          defaultSelectedKeys={["1"]}
          isInvalid={!!errors?.weight}
          errorMessage={errors?.weight?.message}
          variant="bordered"
          radius="sm"
          name="weight"
          onChange={(e) => setWeight(e.target.value)}
        >
          {weightData.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>

        {/* Quantity */}
        <CustomInput
          label="Total Quantity"
          name="quantity"
          type="number"
          register={register}
          error={errors}
          endContent={<p className="text-small text-default-600">pcs</p>}
          validationRules={{
            required: "Quantity is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Must be a positive number",
            },
          }}
        />
      </div>

      {/* Shipping method */}
      <RadioGroup
        label="Shipping Method"
        defaultValue="standard"
        value={shippingMethod}
        onValueChange={setShippingMethod}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <CustomRadio
            description="Regular shipping — 3 to 5 business days"
            value="standard"
          >
            Standard
          </CustomRadio>
          <CustomRadio
            description="Express shipping — next business day"
            value="express"
          >
            Express
          </CustomRadio>
        </div>
      </RadioGroup>

      {/* Payment method */}
      <RadioGroup
        label="Payment Method"
        defaultValue="online"
        value={paymentMethod}
        onValueChange={setPaymentMethod}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <CustomRadio description="Pay securely via Stripe" value="online">
            Online Payment
          </CustomRadio>
          <CustomRadio description="Pay in cash upon delivery" value="cash">
            Cash on Delivery
          </CustomRadio>
        </div>
      </RadioGroup>

      {/* Description */}
      <Textarea
        {...register("description")}
        radius="sm"
        variant="bordered"
        label={t.parcel.description}
        placeholder={t.parcel.form.parcelDescription}
      />

      {/* Success message + Track button */}
      {createdParcelId && (
        <div className="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg text-center space-y-2">
          <p className="text-success font-semibold text-lg">
            ✅ Parcel Created Successfully!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your Parcel ID:{" "}
            <span className="font-mono font-bold text-primary">
              {createdParcelId}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            We&apos;ve sent you a confirmation email. Check your mail for
            details.
          </p>
          <Link
            href={`/parcels/${createdParcelId}`}
            className="inline-block mt-2 text-primary font-medium text-sm hover:underline"
          >
            Track your parcel →
          </Link>
        </div>
      )}

      {/* Actions */}
      {!createdParcelId && (
        <div className="flex gap-3 justify-end pt-2">
          <SecondaryButton
            type="button"
            fullWidth
            onClick={() => router.push("/")}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" fullWidth isLoading={isSubmitting}>
            Create Parcel
          </PrimaryButton>
        </div>
      )}
    </form>
  );
};

export default GuestParcelForm;
