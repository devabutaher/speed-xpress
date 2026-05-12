"use client";

import { useParcel } from "@/hooks/useParcel";
import { QUERY_KEYS } from "@/lib/constants";
import { VALIDATION_PATTERNS } from "@/lib/utils";
import { ModalFormProps, ParcelFormType } from "@/types/FormTypes";
import { ParcelType } from "@/types/ParcelType";
import CustomInput from "@/ui/CustomInput";
import Loading from "@/ui/Loading";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import SelectDistrict from "@/ui/SelectDistrict";
import SelectDivision from "@/ui/SelectDivision";
import { getSingleParcel, updateParcel } from "@/utils/api/parcel";
import { Textarea } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateParcelForm = ({ onClose, id }: ModalFormProps) => {
  const { refetch } = useParcel();

  const { data: singleParcel = {} as ParcelType, isLoading } =
    useQuery<ParcelType>({
      // Use a proper keyed query so it doesn't collide with other parcel queries
      queryKey: QUERY_KEYS.parcel(id ?? ""),
      enabled: !!id,
      queryFn: async (): Promise<ParcelType> => {
        const res = await getSingleParcel(id!);
        if (res.code === "success" && res.data) return res.data;
        throw new Error("Failed to fetch parcel");
      },
    });

  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    if (singleParcel?.recipientInfo) {
      setDivision(singleParcel.recipientInfo.address?.division ?? "");
      setDistrict(singleParcel.recipientInfo.address?.district ?? "");
    }
  }, [singleParcel]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ParcelFormType>();

  const handleForm = async (data: ParcelFormType) => {
    const { address, description, email, name, number } = data;

    const parcelData = {
      recipientInfo: {
        name,
        email,
        number,
        address: { division, district, address },
      },
      description,
    };

    const res = await updateParcel({
      id: singleParcel?._id ?? "",
      data: parcelData,
    });

    if (res.code === "success") {
      refetch();
      onClose();
      toast.success("Parcel updated successfully");
    } else {
      toast.error("Failed to update parcel. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="space-y-4 pb-2"
      noValidate
    >
      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-400">
        Recipient Details
      </h2>

      {isLoading ? (
        <div className="grid place-items-center py-20">
          <Loading size="lg" />
        </div>
      ) : (
        <>
          <CustomInput
            label="Name"
            name="name"
            defaultValue={singleParcel?.recipientInfo?.name ?? ""}
            register={register}
            error={errors}
            validationRules={{
              required: "Name is required",
              pattern: {
                value: VALIDATION_PATTERNS.name,
                message: "Invalid name",
              },
              minLength: { value: 2, message: "Name too short" },
              maxLength: { value: 30, message: "Name too long" },
            }}
          />
          <CustomInput
            label="Email"
            name="email"
            type="email"
            defaultValue={singleParcel?.recipientInfo?.email ?? ""}
            register={register}
            error={errors}
            validationRules={{
              required: "Email is required",
              pattern: {
                value: VALIDATION_PATTERNS.email,
                message: "Invalid email",
              },
            }}
          />
          <CustomInput
            label="Phone Number"
            name="number"
            defaultValue={singleParcel?.recipientInfo?.number ?? ""}
            register={register}
            error={errors}
            validationRules={{
              required: "Phone number is required",
              pattern: {
                value: VALIDATION_PATTERNS.phone,
                message: "Invalid phone",
              },
              minLength: { value: 7, message: "Phone too short" },
              maxLength: { value: 15, message: "Phone too long" },
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
            label="Address"
            name="address"
            defaultValue={singleParcel?.recipientInfo?.address?.address ?? ""}
            register={register}
            error={errors}
            validationRules={{ required: "Address is required" }}
          />
          <Textarea
            {...register("description")}
            defaultValue={singleParcel?.description ?? ""}
            radius="sm"
            variant="bordered"
            label="Description"
            placeholder="Enter parcel description"
          />
        </>
      )}

      <div className="flex gap-3 justify-end pt-2">
        <SecondaryButton type="button" size="md" onClick={onClose}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" size="md" isLoading={isSubmitting}>
          Update
        </PrimaryButton>
      </div>
    </form>
  );
};

export default UpdateParcelForm;
