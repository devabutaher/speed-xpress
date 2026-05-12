"use client";
import DashboardNavbar from "@/components/Dashboard/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "@/hooks/useAuth";
import { ChildrenProps } from "@/types/ChildrenProps";
import Loading from "@/ui/Loading";

export default function DashboardLayout({ children }: ChildrenProps) {
  const { loading } = useAuth();
  return (
    <>
      <DashboardNavbar />
      {loading ? (
        <div className="grid place-items-center h-[60vh]">
          <Loading size="lg" />
        </div>
      ) : (
        <main>{children}</main>
      )}
      <Footer />
    </>
  );
}
