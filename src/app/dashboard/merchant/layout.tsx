"use client";

import RoleGuard from "@/components/Dashboard/RoleGuard";
import { ChildrenProps } from "@/types/ChildrenProps";

export default function MerchantDashboardLayout({ children }: ChildrenProps) {
  return <RoleGuard allowedRole="merchant">{children}</RoleGuard>;
}
