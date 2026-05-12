"use client";

import app from "@/config/firebaseConfig";
import { ROLES, Role, getDashboardPath } from "@/lib/constants";
import { AuthContextType } from "@/types/AuthContextType";
import { ChildrenProps } from "@/types/ChildrenProps";
import { UserType } from "@/types/UserType";
import { saveUser } from "@/utils/api/user";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const auth = getAuth(app);

function resolveRole(displayName: string | null | undefined): Role {
  return ALL_ROLES.includes(displayName as Role)
    ? (displayName as Role)
    : ROLES.REGULAR;
}

const ALL_ROLES = Object.values(ROLES) as Role[];

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const registerUser = useCallback(
    async (
      email: string,
      password: string,
      displayName: string
    ): Promise<User | null> => {
      setLoading(true);
      try {
        const { user: newUser } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(newUser, { displayName });

        const resolvedRole = resolveRole(displayName);
        setUser({ ...newUser, email, displayName });
        setRole(resolvedRole);
        return newUser;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(
          message.includes("email")
            ? "This email is already registered"
            : "Registration failed. Please try again."
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loginUser = useCallback(
    async (email: string, password: string): Promise<User | null> => {
      setLoading(true);
      try {
        const { user: loggedInUser } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        setRole(resolveRole(loggedInUser.displayName));
        return loggedInUser;
      } catch {
        toast.error("Invalid email or password");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const googleSignIn = useCallback(async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const { user: googleUser } = await signInWithPopup(auth, provider);

      if (!googleUser.email) return;

      const userData: UserType = {
        name: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photoURL,
        number: "",
        division: "",
        district: "",
        address: "",
        role: ROLES.REGULAR,
      };

      setRole(ROLES.REGULAR);
      router.push(getDashboardPath(ROLES.REGULAR));

      const userResponse = await saveUser(userData);
      if (userResponse.code === "success") {
        toast.success("Signed in with Google");
      }
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;
      if (code !== "auth/popup-closed-by-user") {
        toast.error("Google sign-in failed. Please try again.");
      }
    }
  }, [router]);

  const logOut = useCallback(async (): Promise<void> => {
    try {
      setUser(null);
      setRole(null);
      await signOut(auth);

      if (pathname !== "/") {
        router.push("/login");
      }

      toast.success("Signed out successfully");
    } catch {
      toast.error("Sign out failed. Please try again.");
    }
  }, [pathname, router]);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
    } catch {
      toast.error("Failed to send reset email. Please try again.");
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setRole(resolveRole(currentUser.displayName));
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    role,
    registerUser,
    googleSignIn,
    loginUser,
    logOut,
    resetPassword,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
