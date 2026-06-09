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
    isError,
    error,
    isFetching,
    dataUpdatedAt,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.parcels(user?.email ?? undefined),
    enabled: !!user?.email && !!role,
    refetchInterval: 30_000,
    queryFn: async (): Promise<ParcelType[]> => {
      const response = isAdminOrRider
        ? await getAllParcel()
        : await getParcelByEmail(user!.email!);

      if (response.code === "success") return response.data ?? [];
      const serverMsg =
        response.error instanceof Error
          ? response.error.message
          : "Failed to fetch parcels";
      throw new Error(serverMsg);
    },
  });

  return {
    parcels,
    isLoading,
    isError,
    error,
    isFetching,
    dataUpdatedAt,
    refetch,
  };
};
