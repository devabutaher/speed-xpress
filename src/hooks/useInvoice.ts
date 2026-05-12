import { QUERY_KEYS, ROLES } from "@/lib/constants";
import { InvoiceType } from "@/types/invoiceType";
import { getAllInvoice, getInvoiceByEmail } from "@/utils/api/invoice";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useInvoice = () => {
  const { user, role } = useAuth();

  const {
    data: invoices = [] as InvoiceType[],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.invoices(user?.email ?? undefined),
    enabled: !!user?.email && !!role,
    queryFn: async (): Promise<InvoiceType[]> => {
      const response =
        role === ROLES.ADMIN
          ? await getAllInvoice()
          : await getInvoiceByEmail(user!.email!);

      if (response.code === "success") return response.data ?? [];
      throw new Error("Failed to fetch invoices");
    },
  });

  return { invoices, isLoading, refetch };
};
