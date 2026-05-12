import { QUERY_KEYS, ROLES } from "@/lib/constants";
import { ParcelType } from "@/types/ParcelType";
import { getAllParcel, getParcelByEmail } from "@/utils/api/parcel";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useParcel = () => {
  const { user, role } = useAuth();

  const isAdminOrRider = role === ROLES.ADMIN || role === ROLES.RIDER;

  const {
    data: parcels = [] as ParcelType[],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.parcels(user?.email ?? undefined),
    enabled: !!user?.email && !!role,
    queryFn: async (): Promise<ParcelType[]> => {
      const response = isAdminOrRider
        ? await getAllParcel()
        : await getParcelByEmail(user!.email!);

      if (response.code === "success") return response.data ?? [];
      throw new Error("Failed to fetch parcels");
    },
  });

  return { parcels, isLoading, refetch };
};
