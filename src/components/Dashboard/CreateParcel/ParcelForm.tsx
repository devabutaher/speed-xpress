"use client";

import { weightData } from "@/data/deliveryData";
import { useShop } from "@/hooks/useShop";
import { useTranslation } from "@/lib/i18n";
import { VALIDATION_PATTERNS } from "@/lib/utils";
import {
  ParcelDataType,
  ParcelFormProps,
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
import SelectShop from "@/ui/SelectShop";
import { createInvoice, updateInvoiceStatus } from "@/utils/api/invoice";
import { createParcel } from "@/utils/api/parcel";
import { createPayment } from "@/utils/api/payment";
import { RadioGroup, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ParcelForm = ({
  division,
  setDivision,
  shippingMethod,
  setShippingMethod,
  setWeight,
  estimatedTotal,
  userInfo,
}: ParcelFormProps) => {
  const t = useTranslation();
  const { shops, isLoading: shopsLoading } = useShop();
  const router = useRouter();

  const [district, setDistrict] = useState("Dhaka");
  const [shop, setShop] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");

  // Pre-select the merchant's first shop once loaded
  useEffect(() => {
    setShop(!shopsLoading && shops.length > 0 ? shops[0].name : "");
  }, [shopsLoading, shops]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ParcelDataType>();

  const handleForm = async (data: ParcelDataType) => {
    const { address, email, name, number, quantity, weight, description } =
      data;

    // ── Build parcel payload ────────────────────────────────────────────────
    let parcelData: ParcelType = {
      senderInfo: {
        name: userInfo?.name ?? "",
        email: userInfo?.email ?? "",
        number: userInfo?.number ?? "",
        address: {
          division: userInfo?.division ?? "",
          district: userInfo?.district ?? "",
          address: userInfo?.address ?? "",
        },
      },
      recipientInfo: {
        name,
        email,
        number,
        address: { division, district, address },
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

    // Attach merchant info if the sender is a merchant
    if (userInfo?.role === "merchant") {
      parcelData = {
        ...parcelData,
        merchantInfo: {
          merchantId: userInfo?._id ?? "",
          ownerName: userInfo?.name ?? "",
          shopName: shop,
          email: userInfo?.email ?? "",
          number: userInfo?.number ?? "",
          address: {
            division: userInfo?.division ?? "",
            district: userInfo?.district ?? "",
            address: userInfo?.address ?? "",
          },
        },
      };
    }

    // ── Create parcel ───────────────────────────────────────────────────────
    const parcelResponse = await createParcel(parcelData);

    if (parcelResponse.code !== "success") {
      toast.error("Failed to create parcel. Please try again.");
      return;
    }

    const parcelId = parcelResponse.data.parcelId ?? "";

    const invoiceBase = {
      userEmail: userInfo?.email ?? "",
      userName: userInfo?.name ?? "",
      userRole: userInfo?.role ?? "",
      parcelId: parcelResponse.data.parcelId ?? "",
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
          "Payment initiation failed. Your parcel was saved — please pay from Invoices.",
        );
        router.push(`/dashboard/${userInfo?.role}/parcels`);
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
        // Redirect to Stripe checkout
        router.push(`${paymentResponse.data.url}`);
      } else {
        toast.error("Invoice update failed. Please contact support.");
      }
      return;
    }

    // ── Cash on delivery ────────────────────────────────────────────────────
    const invoiceResponse = await createInvoice(invoiceBase);

    if (invoiceResponse.code === "success") {
      reset();
      toast.success("✅ Parcel created! Check your email.");
      router.push(`/dashboard/${userInfo?.role}/parcels`);
    } else {
      toast.error("Parcel was created but invoice generation failed.");
      router.push(`/dashboard/${userInfo?.role}/parcels`);
    }
  };

  const isProfileIncomplete = !userInfo?.address;

  return (
    <form onSubmit={handleSubmit(handleForm)} className="space-y-5" noValidate>
      {/* ── Recipient details ─────────────────────────────────────────── */}
      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        Recipient Details
      </h2>

      <CustomInput
        label={t.parcel.form.receiverName}
        name="name"
        register={register}
        error={errors}
        validationRules={{
          required: t.auth.errors.nameRequired,
          pattern: {
            value: VALIDATION_PATTERNS.name,
            message: t.auth.errors.nameInvalid,
          },
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
      <div className="flex gap-3">
        <SelectDivision
          division={division}
          setDivision={setDivision}
          setDistrict={setDistrict}
          variant="bordered"
        />
        <SelectDistrict
          division={division}
          district={district}
          setDistrict={setDistrict}
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

      {/* ── Parcel details ────────────────────────────────────────────── */}
      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide pt-2">
        Parcel Details
      </h2>

      {/* Shop selector — merchant only */}
      {userInfo?.role === "merchant" && (
        <SelectShop shop={shop} setShop={setShop} shops={shops} />
      )}

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

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-2">
        <SecondaryButton type="button" fullWidth onClick={() => router.back()}>
          {t.common.cancel}
        </SecondaryButton>
        <PrimaryButton
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          isDisabled={isProfileIncomplete}
        >
          {t.common.submit}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default ParcelForm;
