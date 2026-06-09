import { useUpdateShop } from "@/hooks/useShopMutations";
import {
  ShopFormType,
  ShopModalPropsType,
  UpdateShopType,
} from "@/types/ShopType";
import CustomInput from "@/ui/CustomInput";
import PrimaryButton from "@/ui/PrimaryButton";
import SelectDistrict from "@/ui/SelectDistrict";
import SelectDivision from "@/ui/SelectDivision";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UpdateShopForm = ({ onClose, id, shop }: ShopModalPropsType) => {
  const updateMutation = useUpdateShop();

  const [division, setDivision] = useState<string>(
    `${shop.address.division || ""}`
  );
  const [district, setDistrict] = useState<string>(
    `${shop.address.district || ""}`
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const handleForm = async (data: ShopFormType) => {
    const { name, email, number, address } = data;

    const shopData: UpdateShopType = {
      name,
      email,
      number,
      address: {
        division,
        district,
        address: address,
      },
    };

    updateMutation.mutate(
      { id, data: shopData },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
      <CustomInput
        label="Shop Name"
        name="name"
        defaultValue={shop.name || ""}
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
      <CustomInput
        label={"Shop Email"}
        name="email"
        type="email"
        defaultValue={shop.email || ""}
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
        label="Phone Number"
        name="number"
        defaultValue={shop.number || ""}
        register={register}
        error={errors}
        validationRules={{
          required: "*phone number is required",
          pattern: {
            value: /^[0-9+\-\s()]{7,20}$/,
            message: "invalid phone number",
          },
          minLength: { value: 7, message: "*invalid phone number" },
          maxLength: { value: 20, message: "*invalid phone number" },
        }}
      />
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
        defaultValue={shop.address.address || ""}
        register={register}
        error={errors}
        validationRules={{
          required: "*address is required",
        }}
      />
      <PrimaryButton
        type="submit"
        fullWidth={true}
        isDisabled={updateMutation.isPending}
        isLoading={updateMutation.isPending}
      >
        Update Shop
      </PrimaryButton>
    </form>
  );
};

export default UpdateShopForm;
