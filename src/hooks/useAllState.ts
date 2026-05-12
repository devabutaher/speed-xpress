import { AllStateContext } from "@/providers/AllStateProvider";
import { AllStateType } from "@/types/AllStateType";
import { useContext } from "react";

export const useAllState = (): AllStateType => {
  const context = useContext(AllStateContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error("useAllState must be used within an AllStateProvider");
  }

  return context;
};
