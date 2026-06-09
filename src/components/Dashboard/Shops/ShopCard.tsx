"use client";

import { useShop } from "@/hooks/useShop";
import { useDeleteShop } from "@/hooks/useShopMutations";
import ErrorAlert from "@/ui/ErrorAlert";
import Loading from "@/ui/Loading";
import SecondaryButton from "@/ui/SecondaryButton";
import Image from "next/image";
import { FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import UpdateShopModal from "./UpdateShopModal";

const ShopCard = () => {
  const { shops, isLoading, isError, error, refetch } = useShop();
  const deleteMutation = useDeleteShop();

  const handleDeleteShop = (id: string) => {
    if (shops.length !== 1) {
      deleteMutation.mutate(id);
    } else {
      toast.warning("You have only one shop");
    }
  };

  return (
    <>
      {isError && (
        <div className="mb-4">
          <ErrorAlert
            message={
              error instanceof Error
                ? error.message
                : "Failed to load shops. Please try again."
            }
            onRetry={() => refetch()}
          />
        </div>
      )}

      {isLoading ? (
        <div className="grid place-items-center h-[40rem]">
          <Loading size="lg" />
        </div>
      ) : shops.length === 0 ? (
        <div className="grid place-items-center">
          <Image
            className="w-[30rem]"
            src={"/assets/images/no_data.png"}
            width={600}
            height={600}
            alt="no data"
          />
          <h1 className="text-xl font-bold">CANNOT GET SHOP DATA</h1>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
          {shops.map((shop) => (
            <div
              key={shop.shopId}
              className="flex flex-col gap-8 bg-gray-200 dark:bg-gray-900 p-8 rounded-lg max-w-[40rem] w-full h-full"
            >
              <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl font-semibold whitespace-nowrap">
                  {shop.name}
                </h1>

                {/* Update and Delete shop */}
                <div className="flex gap-4">
                  <UpdateShopModal
                    id={shop.shopId}
                    refetch={refetch}
                    shop={shop}
                  />

                  <SecondaryButton
                    size="sm"
                    onClick={() => handleDeleteShop(shop._id)}
                  >
                    <FiTrash />
                  </SecondaryButton>
                </div>
              </div>
              {/* Shop info */}
              <div className="grid sm:grid-cols-2 sm:gap-8 gap-4">
                <div>
                  <label htmlFor="id" className="text-sm">
                    Shop ID
                  </label>
                  <h1 className="text-lg sm:text-xl whitespace-nowrap capitalize">
                    {shop.shopId}
                  </h1>
                </div>
                <div>
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <h1 className="text-lg sm:text-xl">{shop.email}</h1>
                </div>
                <div>
                  <label htmlFor="number" className="text-sm">
                    Number
                  </label>
                  <h1 className="text-lg sm:text-xl whitespace-nowrap">
                    {shop.number}
                  </h1>
                </div>
                <div>
                  <label htmlFor="address" className="text-sm">
                    Address
                  </label>
                  <h1 className="text-lg sm:text-xl whitespace-nowrap capitalize">
                    {shop.address.address}
                  </h1>
                </div>
                <div>
                  <label htmlFor="division" className="text-sm">
                    Division
                  </label>
                  <h1 className="text-lg sm:text-xl whitespace-nowrap capitalize">
                    {shop.address.division}
                  </h1>
                </div>
                <div>
                  <label htmlFor="district" className="text-sm">
                    District
                  </label>
                  <h1 className="text-lg sm:text-xl whitespace-nowrap capitalize">
                    {shop.address.district}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShopCard;
