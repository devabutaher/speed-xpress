import { useShop } from "@/hooks/useShop";
import { useUserInfo } from "@/hooks/useUserInfo";
import { OnCloseProps } from "@/types/FormTypes";
import { ShopFormType, ShopType } from "@/types/ShopType";
import CustomInput from "@/ui/CustomInput";
import PrimaryButton from "@/ui/PrimaryButton";
import SelectDistrict from "@/ui/SelectDistrict";
import SelectDivision from "@/ui/SelectDivision";
import { createShop } from "@/utils/api/shop";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateShopForm = ({ onClose }: OnCloseProps) => {
  const { userInfo } = useUserInfo();
  const { refetch } = useShop();
  const [division, setDivision] = useState<string>("Dhaka");
  const [district, setDistrict] = useState<string>("Dhaka");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const handleForm = async (data: ShopFormType) => {
    const { name, email, number, address } = data;

    setLoading(true);

    const shopData: ShopType = {
      name,
      email,
      number,
      address: {
        division,
        district,
        address: address,
      },
      merchantId: userInfo._id!,
      merchantEmail: userInfo.email!,
    };

    // Shop response
    const shopResponse = await createShop(shopData);

    if (shopResponse.code === "success") {
      reset();
      refetch();
      onClose();
      setLoading(false);
      toast.success("Shop created successfully");
      router.push(`/dashboard/merchant/shops`);
    } else {
      setLoading(false);
      toast.error("Shop created failed");
      console.error(shopResponse.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="flex flex-col gap-4 py-2"
    >
      <CustomInput
        label="Shop Name"
        name="name"
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
        Create New Shop
      </PrimaryButton>
    </form>
  );
};

export default CreateShopForm;
