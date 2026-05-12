"use client";

import RoleGuard from "@/components/Dashboard/RoleGuard";
import { ChildrenProps } from "@/types/ChildrenProps";

export default function RiderDashboardLayout({ children }: ChildrenProps) {
  return <RoleGuard allowedRole="rider">{children}</RoleGuard>;
}
