import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import UserTable from "@/components/Dashboard/Users/UserTable";

export default function MerchantsPage() {
  return (
    <div className="container-xl py-10">
      <DashboardPageHeader title="All" highlight="Merchants" />
      <UserTable />
    </div>
  );
}