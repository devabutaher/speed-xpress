"use client";

// src/components/Dashboard/RoleGuard.tsx
// Eliminates the 4×-duplicated role layout files:
//   admin/layout.tsx, merchant/layout.tsx, regular/layout.tsx, rider/layout.tsx
//
// Usage in each role's layout.tsx:
//   import RoleGuard from "@/components/Dashboard/RoleGuard";
//   export default function AdminLayout({ children }) {
//     return <RoleGuard allowedRole="admin">{children}</RoleGuard>;
//   }

import { useAuth } from "@/hooks/useAuth";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { Role } from "@/lib/constants";
import { ChildrenProps } from "@/types/ChildrenProps";
import Loading from "@/ui/Loading";

interface RoleGuardProps extends ChildrenProps {
  allowedRole: Role;
}

const RoleGuard = ({ children, allowedRole }: RoleGuardProps) => {
  const { loading } = useAuth();
  const isAuthorized = usePrivateRoute((role) => role === allowedRole);

  if (loading || isAuthorized === null) {
    return (
      <div className="grid place-items-center h-[60vh]">
        <Loading size="lg" />
      </div>
    );
  }

  if (!isAuthorized) return null;

  return <>{children}</>;
};

export default RoleGuard;
