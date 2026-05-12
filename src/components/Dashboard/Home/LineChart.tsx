"use client";

import { ParcelType } from "@/types/ParcelType";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
);

const LineChart = ({ parcels }: { parcels: ParcelType[] }) => {
  // Use just the date part for cleaner labels
  const labels = parcels.map((p) =>
    p.deliveryDateTime ? p.deliveryDateTime.split(",")[0] : "",
  );
  const amounts = parcels.map((p) => p.paymentInfo?.amount ?? 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Charge per Parcel (৳)",
        data: amounts,
        fill: true,
        borderColor: "#3b82f6",
        pointBorderColor: "#3b82f6",
        pointBackgroundColor: "#fff",
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 6, maxRotation: 0 },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(156, 163, 175, 0.15)" },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <div className="w-full dashboard-card">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
        Revenue Over Time
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
