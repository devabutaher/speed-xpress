import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import InvoiceTable from "@/components/Dashboard/Invoices/InvoiceTable";

export default function InvoicesPage() {
  return (
    <div className="container-xl py-10">
      <DashboardPageHeader title="All" highlight="Invoices" />
      <InvoiceTable />
    </div>
  );
}