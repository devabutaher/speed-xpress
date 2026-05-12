"use client";

import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath, Role } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";
import { RegisterFormType, RegisterUserDataType } from "@/types/FormTypes";
import { ShopType } from "@/types/ShopType";
import CustomInput from "@/ui/CustomInput";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import SelectDistrict from "@/ui/SelectDistrict";
import SelectDivision from "@/ui/SelectDivision";
import SelectVehicles from "@/ui/SelectVehicles";
import { createShop } from "@/utils/api/shop";
import { saveUser } from "@/utils/api/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterForm = ({ role }: { role: Role }) => {
  const t = useTranslation();
  const { googleSignIn, registerUser, loading } = useAuth();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [division, setDivision] = useState<string>("Dhaka");
  const [district, setDistrict] = useState<string>("Dhaka");
  const [vehicle, setVehicle] = useState<string>("Bike");

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const handleForm = async (data: RegisterFormType) => {
    const { name, email, password, number, address, shopName } = data;

    let userData: RegisterUserDataType = {
      name,
      email,
      number,
      division,
      district,
      address,
      role,
      photoURL: "",
    };

    if (role === "merchant") {
      userData = {
        ...userData,
        shopName,
      };
    }

    if (role === "rider") {
      userData = {
        ...userData,
        vehicle,
      };
    }

    const result = await registerUser(email, password, role);

    if (result !== null) {
      const userResponse = await saveUser(userData);

      if (userResponse.code === "success") {
        toast.success(t.auth.success.register);

        if (userResponse.data.role === "merchant") {
          const shopData: ShopType = {
            name: userResponse.data.shopName as string,
            email: userResponse.data.email as string,
            number: userResponse.data.number as string,
            address: {
              division: userResponse.data.division as string,
              district: userResponse.data.district as string,
              address: userResponse.data.address as string,
            },
            merchantId: userResponse.data._id as string,
            merchantEmail: userResponse.data.email as string,
          };

          const shopResponse = await createShop(shopData);

          if (shopResponse.code === "success") {
            reset();
            router.push(getDashboardPath(result.role));
          } else {
            console.error(shopResponse.error);
          }
        } else {
          reset();
          router.push(getDashboardPath(result.role));
        }
      } else {
        console.error(userResponse.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
      {role === "regular" && (
        <SecondaryButton
          type="button"
          fullWidth
          onClick={() => {
            googleSignIn();
          }}
        >
          <FaGoogle /> Sign in with Google
        </SecondaryButton>
      )}
      <CustomInput
        label={role !== "merchant" ? "Name" : "Owner Name"}
        name="name"
        register={register}
        error={errors}
        validationRules={{
          required: "*name is required",
          pattern: { value: /^[A-Za-z ]+$/i, message: "*name is invalid" },
          minLength: { value: 2, message: "*name is invalid" },
          maxLength: { value: 20, message: "*name is invalid" },
        }}
      />
      {role === "merchant" && (
        <CustomInput
          label="Shop Name"
          name="shopName"
          register={register}
          error={errors}
          validationRules={{
            required: "*shop name is required",
            pattern: {
              value: /^[A-Za-z ]+$/i,
              message: "*shop name is invalid",
            },
            minLength: { value: 2, message: "*shop name is invalid" },
            maxLength: { value: 20, message: "*shop name is invalid" },
          }}
        />
      )}
      <CustomInput
        label={role !== "merchant" ? "Email" : "Business Email"}
        name="email"
        type="email"
        register={register}
        error={errors}
        validationRules={{
          required: "*email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "*invalid email address",
          },
        }}
      />
      <CustomInput
        label="Password"
        name="password"
        register={register}
        error={errors}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        validationRules={{
          required: "*password is required",
          minLength: { value: 6, message: "*password must be 6 characters" },
        }}
      />
      <CustomInput
        label="Phone Number"
        name="number"
        register={register}
        error={errors}
        validationRules={{
          required: "*phone number is required",
          pattern: {
            value: /^[0-9+\\-]+$/,
            message: "invalid phone number",
          },
          minLength: { value: 7, message: "*invalid phone number" },
          maxLength: { value: 15, message: "*invalid phone number" },
        }}
      />
      {role === "rider" && (
        <SelectVehicles vehicle={vehicle} setVehicle={setVehicle} />
      )}
      <div className="flex gap-4">
        <SelectDivision
          division={division}
          setDivision={setDivision}
          setDistrict={setDistrict}
        />
        <SelectDistrict
          division={division}
          district={district}
          setDistrict={setDistrict}
        />
      </div>
      <CustomInput
        label="Address"
        name="address"
        register={register}
        error={errors}
        validationRules={{
          required: "*address is required",
        }}
      />
      <PrimaryButton
        type="submit"
        fullWidth={true}
        isDisabled={loading}
        isLoading={loading}
      >
        Register Now Free
      </PrimaryButton>
    </form>
  );
};

export default RegisterForm;
