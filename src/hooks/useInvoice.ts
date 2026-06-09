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
    isError,
    error,
    isFetching,
    dataUpdatedAt,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.invoices(user?.email ?? undefined),
    enabled: !!user?.email && !!role,
    refetchInterval: 30_000,
    queryFn: async (): Promise<InvoiceType[]> => {
      const response =
        role === ROLES.ADMIN
          ? await getAllInvoice()
          : await getInvoiceByEmail(user!.email!);

      if (response.code === "success") return response.data ?? [];
      const serverMsg =
        response.error instanceof Error
          ? response.error.message
          : "Failed to fetch invoices";
      throw new Error(serverMsg);
    },
  });

  return {
    invoices,
    isLoading,
    isError,
    error,
    isFetching,
    dataUpdatedAt,
    refetch,
  };
};
