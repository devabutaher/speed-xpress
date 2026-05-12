"use client";

import { ParcelType, Status } from "@/types/ParcelType";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ parcels }: { parcels: ParcelType[] }) => {
  const count = (status: Status) =>
    parcels.filter((p) => p.parcelStatus === status).length;

  const data = {
    labels: ["Delivered", "Pending", "Picked", "Returned", "Cancelled"],
    datasets: [
      {
        label: "Parcel Status",
        data: [
          count(Status.Delivered),
          count(Status.Pending),
          count(Status.Picked),
          count(Status.Returned),
          count(Status.Canceled),
        ],
        backgroundColor: [
          "#22c55e", // green  — delivered
          "#3b82f6", // blue   — pending
          "#f59e0b", // amber  — picked
          "#f97316", // orange — returned
          "#ef4444", // red    — cancelled
        ],
        borderWidth: 2,
        borderColor: "transparent",
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { label: string; raw: unknown }) =>
            ` ${ctx.label}: ${ctx.raw} parcels`,
        },
      },
    },
  };

  return (
    <div className="dashboard-card w-full max-w-xs mx-auto">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide text-center">
        Status Breakdown
      </h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
