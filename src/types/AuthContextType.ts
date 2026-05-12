import { Role } from "@/lib/constants";
import { User } from "firebase/auth";

export type FirebaseUser = User | null;

export type AuthContextType = {
  user: FirebaseUser;
  role: Role | null;
  registerUser: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<User | null>;
  googleSignIn: () => Promise<void>;
  loginUser: (email: string, password: string) => Promise<User | null>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
