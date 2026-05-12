import { Role } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RoleCheck = (role: Role | null) => boolean;

/**
 * Guards a page by role. Redirects to /login if not authenticated
 * or the role check fails.
 *
 * Returns `true` when the user is authorised, `null` while loading,
 * and `false` after a redirect has been issued.
 *
 * Usage:
 * ```tsx
 * const isAuthorized = usePrivateRoute((role) => role === "admin");
 * if (!isAuthorized) return null;
 * ```
 */
const usePrivateRoute = (roleCheck: RoleCheck): boolean | null => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  const isAuthorized = !loading && !!user && roleCheck(role);

  useEffect(() => {
    if (loading) return;
    if (!user || !roleCheck(role)) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, role, loading]);

  if (loading) return null;
  return isAuthorized;
};

export default usePrivateRoute;
