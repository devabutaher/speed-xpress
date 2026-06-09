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
    isError: isUserError,
    error: userError,
    isFetching: isUserFetching,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.userInfo(user?.email ?? undefined),
    enabled: !!user?.email,
    queryFn: async (): Promise<UserType> => {
      const response = await getSingleUser(user!.email!);
      if (response.code === "success") return response.data;
      const serverMsg =
        response.error instanceof Error
          ? response.error.message
          : "Failed to fetch user info";
      throw new Error(serverMsg);
    },
  });

  // ── All users (admin only) ────────────────────────────────────────────────
  const {
    data: allUser = [] as UserType[],
    isLoading: allIsLoading,
    isError: isAllError,
    error: allError,
    isFetching: isAllFetching,
    refetch: refetchAll,
  } = useQuery({
    queryKey: QUERY_KEYS.users(),
    enabled: !!user?.email && role === ROLES.ADMIN,
    queryFn: async (): Promise<UserType[]> => {
      const response = await getAllUsers();
      if (response.code === "success") return response.data;
      const serverMsg =
        response.error instanceof Error
          ? response.error.message
          : "Failed to fetch users";
      throw new Error(serverMsg);
    },
  });

  return {
    userInfo,
    isLoading,
    isUserError,
    userError,
    isUserFetching,
    refetch,
    allUser,
    allIsLoading,
    isAllError,
    allError,
    isAllFetching,
    refetchAll,
  };
};
