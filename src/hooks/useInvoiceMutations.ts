import { QUERY_KEYS } from "@/lib/constants";
import { InvoiceType } from "@/types/invoiceType";
import { deleteInvoice } from "@/utils/api/invoice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// ── Delete invoice (with optimistic removal) ────────────────────────────────
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInvoice(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["invoices"] });

      const previousQueries = queryClient.getQueriesData<InvoiceType[]>({
        queryKey: ["invoices"],
      });

      // Optimistically remove from cache
      queryClient.setQueriesData<InvoiceType[]>(
        { queryKey: ["invoices"] },
        (old) =>
          old?.filter((inv) => inv._id !== id && inv.invoiceId !== id) ?? []
      );

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousQueries) {
        for (const [key, data] of context.previousQueries) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error("Failed to delete invoice");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};
