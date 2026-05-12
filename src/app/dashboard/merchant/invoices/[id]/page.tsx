"use client";
import InvoiceDetails from "@/components/Dashboard/Invoices/InvoiceDetails";
import Loading from "@/ui/Loading";
import SecondaryButton from "@/ui/SecondaryButton";
import { useRouter } from "next/navigation";

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // TODO: Add useSingleInvoice hook when available
  // const { data, isLoading } = useSingleInvoice(params.id);

  const isLoading = false;
  const data = null;

  return (
    <div className="container-xl py-10 lg:py-16 space-y-8">
      <div className="flex items-center gap-4">
        <SecondaryButton size="sm" onClick={() => router.back()}>← Back</SecondaryButton>
        <h1 className="font-bold text-3xl lg:text-4xl">
          INVOICE <span className="text-primary">DETAILS</span>
        </h1>
      </div>
      {isLoading
        ? <div className="grid place-items-center h-60"><Loading size="lg" /></div>
        : data
          ? <InvoiceDetails invoiceData={data} />
          : <p className="text-gray-500">Invoice not found.</p>
      }
    </div>
  );
}