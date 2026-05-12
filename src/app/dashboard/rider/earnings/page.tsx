"use client";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import ParcelTable from "@/components/Dashboard/Parcels/ParcelTable";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

export default function EarningsPage() {
  const [earnings, setEarnings] = useState(0);
  return (
    <div className="container-xl py-10">
      <DashboardPageHeader
        title="All"
        highlight="Earnings"
        actions={
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Earnings
            </p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(earnings, "BDT")}
            </p>
          </div>
        }
      />
      <ParcelTable setEarnings={setEarnings} />
    </div>
  );
}
