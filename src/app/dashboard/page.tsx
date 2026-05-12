"use client";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath } from "@/lib/constants";
import Loading from "@/ui/Loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRootPage() {
  const { role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(role ? getDashboardPath(role) : "/login");
    }
  }, [role, loading, router]);

  return (
    <div className="grid place-items-center h-[60vh]">
      <Loading size="lg" />
    </div>
  );
}
