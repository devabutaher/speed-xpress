import { QUERY_KEYS } from "@/lib/constants";
import { ParcelType, Status } from "@/types/ParcelType";
import { deleteParcel, updateParcel, updateParcelStatus } from "@/utils/api/parcel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// ── Update parcel status (with optimistic update) ────────────────────────────
export const useUpdateParcelStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { parcelStatus: Status };
    }) => updateParcelStatus({ id, data }),

    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["parcels"] });

      // Snapshot the previous cache for rollback
      const previousQueries = queryClient.getQueriesData<ParcelType[]>({
        queryKey: ["parcels"],
      });

      // Optimistically update parcel status in all parcel list caches
      queryClient.setQueriesData<ParcelType[]>(
        { queryKey: ["parcels"] },
        (old) =>
          old?.map((p) =>
            p._id === id || p.parcelId === id
              ? { ...p, parcelStatus: data.parcelStatus }
              : p
          ) ?? []
      );

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      // Rollback on error
      if (context?.previousQueries) {
        for (const [key, data] of context.previousQueries) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error("Failed to update parcel status");
    },

    onSettled: () => {
      // Refetch parcels and invoices (status change may affect invoices)
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};

// ── Update parcel info (recipient details) ───────────────────────────────────
export const useUpdateParcel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; data: any }) => updateParcel(params),

    onSuccess: () => {
      toast.success("Parcel updated successfully");
    },

    onError: () => {
      toast.error("Failed to update parcel. Please try again.");
    },

    onSettled: (_data, _error, variables) => {
      // Refetch the specific parcel and the list
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
      queryClient.invalidateQueries({
        queryKey: ["parcels", variables.id],
      });
    },
  });
};

// ── Delete parcel (with optimistic removal) ─────────────────────────────────
export const useDeleteParcel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteParcel(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["parcels"] });

      const previousQueries = queryClient.getQueriesData<ParcelType[]>({
        queryKey: ["parcels"],
      });

      // Optimistically remove from cache
      queryClient.setQueriesData<ParcelType[]>(
        { queryKey: ["parcels"] },
        (old) => old?.filter((p) => p._id !== id && p.parcelId !== id) ?? []
      );

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousQueries) {
        for (const [key, data] of context.previousQueries) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error("Failed to delete parcel");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
    },
  });
};
