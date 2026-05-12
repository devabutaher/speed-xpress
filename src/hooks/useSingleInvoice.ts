import { QUERY_KEYS } from "@/lib/constants";
import { InvoiceType } from "@/types/invoiceType";
import { getSingleInvoice } from "@/utils/api/invoice";
import { useQuery } from "@tanstack/react-query";

export const useSingleInvoice = (id: string) => {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: QUERY_KEYS.invoice(id),
    enabled: !!id,
    queryFn: async (): Promise<InvoiceType | null> => {
      const response = await getSingleInvoice(id);
      if (response.code === "success") return response.data ?? null;
      return null;
    },
  });

  return { data, isLoading };
};
