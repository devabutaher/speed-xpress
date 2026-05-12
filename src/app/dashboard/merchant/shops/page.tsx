import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import ShopCard from "@/components/Dashboard/Shops/ShopCard";

export default function ShopsPage() {
  return (
    <div className="container-xl py-10">
      <DashboardPageHeader title="My" highlight="Shops" />
      <ShopCard />
    </div>
  );
}