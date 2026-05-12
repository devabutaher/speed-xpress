import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import ParcelTable from "@/components/Dashboard/Parcels/ParcelTable";

export default function DeliveriesPage() {
  return (
    <div className="container-xl py-10">
      <DashboardPageHeader title="All" highlight="Deliveries" />
      <ParcelTable />
    </div>
  );
}