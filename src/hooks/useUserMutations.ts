import { QUERY_KEYS } from "@/lib/constants";
import { UserType } from "@/types/UserType";
import { deleteUserById } from "@/utils/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// ── Delete user (with optimistic removal) ───────────────────────────────────
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUserById(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousQueries = queryClient.getQueriesData<UserType[]>({
        queryKey: ["users"],
      });

      // Optimistically remove user from cache
      queryClient.setQueriesData<UserType[]>(
        { queryKey: ["users"] },
        (old) => old?.filter((u) => u._id !== id) ?? []
      );

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousQueries) {
        for (const [key, data] of context.previousQueries) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error("Failed to delete user");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
