import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import ParcelTable from "@/components/Dashboard/Parcels/ParcelTable";

export default function CompletedDeliveriesPage() {
  return (
    <div className="container-xl py-10 lg:py-16">
      <DashboardPageHeader title="COMPLETED" highlight="DELIVERIES" />
      <ParcelTable />
    </div>
  );
}