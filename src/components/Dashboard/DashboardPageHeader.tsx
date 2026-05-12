// src/components/Dashboard/DashboardPageHeader.tsx
// Shared header used by all dashboard list pages (parcels, invoices, users, etc.)
// Eliminates the repeated heading + accent-bar + InfoAlert pattern.

import InfoAlert from "@/ui/InfoAlert";

interface DashboardPageHeaderProps {
  title: string;
  highlight: string;
  alertMessage?: string;
  alertVariant?: "info" | "success" | "warning" | "danger";
  actions?: React.ReactNode;
}

const DashboardPageHeader = ({
  title,
  highlight,
  alertMessage,
  alertVariant = "info",
  actions,
}: DashboardPageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold uppercase lg:text-3xl">
          {title} <span className="text-primary">{highlight}</span>
        </h1>
        {/* Decorative accent */}
        <div className="flex items-center gap-1">
          <span className="inline-block w-16 h-1 bg-primary rounded-full" />
          <span className="inline-block w-4 h-1 bg-primary rounded-full" />
          <span className="inline-block w-2 h-1 bg-primary rounded-full" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {alertMessage && (
          <InfoAlert message={alertMessage} variant={alertVariant} />
        )}
        {actions}
      </div>
    </div>
  );
};

export default DashboardPageHeader;
