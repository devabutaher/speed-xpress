import { QUERY_KEYS } from "@/lib/constants";
import { ShopResponseType } from "@/types/ShopType";
import { deleteShop, updateShop } from "@/utils/api/shop";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// ── Delete shop (with optimistic removal) ───────────────────────────────────
export const useDeleteShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteShop(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["shops"] });

      const previousQueries = queryClient.getQueriesData<ShopResponseType[]>({
        queryKey: ["shops"],
      });

      // Optimistically remove from cache
      queryClient.setQueriesData<ShopResponseType[]>(
        { queryKey: ["shops"] },
        (old) =>
          old?.filter((s) => s._id !== id && s.shopId !== id) ?? []
      );

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousQueries) {
        for (const [key, data] of context.previousQueries) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error("Failed to delete shop");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
};

// ── Update shop ─────────────────────────────────────────────────────────────
export const useUpdateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; data: any }) => updateShop(params),

    onSuccess: () => {
      toast.success("Shop updated successfully");
    },

    onError: () => {
      toast.error("Failed to update shop");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
};
