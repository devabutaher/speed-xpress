import { AuthContext } from "@/providers/AuthProvider";
import { AuthContextType } from "@/types/AuthContextType";
import { useContext } from "react";

let _logOut: AuthContextType["logOut"];

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  _logOut = context.logOut;

  return context;
};

export const getLogOutFunction = (): AuthContextType["logOut"] => _logOut;
