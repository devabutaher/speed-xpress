"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import { VALIDATION_PATTERNS } from "@/lib/utils";
import { OnCloseProps, ProfileFormType } from "@/types/FormTypes";
import CustomInput from "@/ui/CustomInput";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import SelectDistrict from "@/ui/SelectDistrict";
import SelectDivision from "@/ui/SelectDivision";
import { updateUser } from "@/utils/api/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProfileForm = ({ onClose }: OnCloseProps) => {
  const { userInfo, refetch } = useUserInfo();

  const [division, setDivision] = useState(userInfo?.division ?? "");
  const [district, setDistrict] = useState(userInfo?.district ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormType>();

  const handleForm = async (data: ProfileFormType) => {
    if (!userInfo?._id) {
      toast.error("Could not identify user. Please refresh and try again.");
      return;
    }

    const profileData = { ...data, division, district };

    const res = await updateUser({ id: userInfo._id, data: profileData });

    if (res.code === "success") {
      refetch();
      onClose();
      toast.success("Profile updated successfully");
    } else {
      // Was: toast.success("Profile updated failed") — bug fixed
      toast.error("Profile update failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="space-y-4 py-4"
      noValidate
    >
      <CustomInput
        label="Name"
        name="name"
        defaultValue={userInfo?.name ?? ""}
        register={register}
        error={errors}
        validationRules={{
          required: "Name is required",
          pattern: { value: VALIDATION_PATTERNS.name, message: "Invalid name" },
          minLength: { value: 2, message: "Name too short" },
          maxLength: { value: 30, message: "Name too long" },
        }}
      />
      <CustomInput
        label="Phone Number"
        name="number"
        defaultValue={userInfo?.number ?? ""}
        register={register}
        error={errors}
        validationRules={{
          required: "Phone number is required",
          pattern: {
            value: VALIDATION_PATTERNS.phone,
            message: "Invalid phone",
          },
          minLength: { value: 7, message: "Phone too short" },
          maxLength: { value: 20, message: "Phone too long" },
        }}
      />
      <CustomInput
        label="Address"
        name="address"
        defaultValue={userInfo?.address ?? ""}
        register={register}
        error={errors}
        validationRules={{ required: "Address is required" }}
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

export default ProfileForm;
