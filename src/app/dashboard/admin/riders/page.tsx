import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import UserTable from "@/components/Dashboard/Users/UserTable";

export default function RidersPage() {
  return (
    <div className="container-xl py-10">
      <DashboardPageHeader title="All" highlight="Riders" />
      <UserTable />
    </div>
  );
}