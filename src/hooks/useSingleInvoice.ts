import { QUERY_KEYS } from "@/lib/constants";
import { InvoiceType } from "@/types/invoiceType";
import { getSingleInvoice } from "@/utils/api/invoice";
import { useQuery } from "@tanstack/react-query";

export const useSingleInvoice = (id: string) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.invoice(id),
    enabled: !!id,
    staleTime: 10_000,
    queryFn: async (): Promise<InvoiceType | null> => {
      const response = await getSingleInvoice(id);
      if (response.code === "success") return response.data ?? null;
      const serverMsg =
        response.error instanceof Error
          ? response.error.message
          : `Invoice ${id} not found`;
      throw new Error(serverMsg);
    },
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
