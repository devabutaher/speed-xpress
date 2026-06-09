import { QUERY_KEYS } from "@/lib/constants";
import { ParcelType } from "@/types/ParcelType";
import { getSingleParcel } from "@/utils/api/parcel";
import { useQuery } from "@tanstack/react-query";

const useSingleParcel = (id: string) => {
  return useQuery<ParcelType | null>({
    queryKey: QUERY_KEYS.parcel(id),
    enabled: !!id,
    staleTime: 10_000,
    queryFn: async (): Promise<ParcelType | null> => {
      const response = await getSingleParcel(id);
      if (response.code === "success") return response.data;
      const serverMsg =
        response.error instanceof Error
          ? response.error.message
          : `Parcel ${id} not found`;
      throw new Error(serverMsg);
    },
  });
};

export default useSingleParcel;
