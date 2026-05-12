"use client";

import RoleGuard from "@/components/Dashboard/RoleGuard";
import { ChildrenProps } from "@/types/ChildrenProps";

export default function RegularDashboardLayout({ children }: ChildrenProps) {
  return <RoleGuard allowedRole="regular">{children}</RoleGuard>;
}
