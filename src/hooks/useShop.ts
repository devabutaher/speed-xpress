import { QUERY_KEYS, ROLES } from "@/lib/constants";
import { ShopResponseType } from "@/types/ShopType";
import { getAllShop, getShopsByEmail } from "@/utils/api/shop";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useShop = () => {
  const { user, role } = useAuth();

  const isMerchantOrAdmin = role === ROLES.MERCHANT || role === ROLES.ADMIN;

  const {
    data: shops = [] as ShopResponseType[],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.shops(user?.email ?? undefined),
    enabled: !!user?.email && isMerchantOrAdmin,
    queryFn: async (): Promise<ShopResponseType[]> => {
      const response =
        role === ROLES.MERCHANT
          ? await getShopsByEmail(user!.email!)
          : await getAllShop();

      if (response.code === "success") return response.data ?? [];
      throw new Error("Failed to fetch shops");
    },
  });

  return { shops, isLoading, refetch };
};
