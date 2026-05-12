import { QUERY_KEYS, ROLES } from "@/lib/constants";
import { UserType } from "@/types/UserType";
import { getAllUsers, getSingleUser } from "@/utils/api/user";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useUserInfo = () => {
  const { user, role } = useAuth();

  // ── Current user's info ───────────────────────────────────────────────────
  const {
    data: userInfo = {} as UserType,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.userInfo(user?.email ?? undefined),
    enabled: !!user?.email,
    queryFn: async (): Promise<UserType> => {
      const response = await getSingleUser(user!.email!);
      if (response.code === "success") return response.data;
      throw new Error("Failed to fetch user info");
    },
  });

  // ── All users (admin only) ────────────────────────────────────────────────
  const {
    data: allUser = [] as UserType[],
    isLoading: allIsLoading,
    refetch: refetchAll,
  } = useQuery({
    queryKey: QUERY_KEYS.users(),
    enabled: !!user?.email && role === ROLES.ADMIN,
    queryFn: async (): Promise<UserType[]> => {
      const response = await getAllUsers();
      if (response.code === "success") return response.data;
      throw new Error("Failed to fetch users");
    },
  });

  return { userInfo, isLoading, refetch, allUser, allIsLoading, refetchAll };
};
