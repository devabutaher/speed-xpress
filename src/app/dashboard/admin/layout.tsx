"use client";

import RoleGuard from "@/components/Dashboard/RoleGuard";
import { ChildrenProps } from "@/types/ChildrenProps";

export default function AdminDashboardLayout({ children }: ChildrenProps) {
  return <RoleGuard allowedRole="admin">{children}</RoleGuard>;
}
