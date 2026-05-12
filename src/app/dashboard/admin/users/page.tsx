import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import UserTable from "@/components/Dashboard/Users/UserTable";

export default function UsersPage() {
  return (
    <div className="container-xl py-10 lg:py-16">
      <DashboardPageHeader title="ALL" highlight="USERS" />
      <UserTable />
    </div>
  );
}