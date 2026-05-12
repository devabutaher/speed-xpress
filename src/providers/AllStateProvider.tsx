"use client";

import { STORAGE_KEYS, type Locale } from "@/lib/constants";
import { AllStateType } from "@/types/AllStateType";
import { ChildrenProps } from "@/types/ChildrenProps";
import { createContext, useCallback, useEffect, useState } from "react";

export const AllStateContext = createContext<AllStateType>({} as AllStateType);

const AllStateProvider = ({ children }: ChildrenProps) => {
  const [localTheme, setLocalTheme] = useState<"dark" | "light">("dark");
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCALE) as Locale | null;
      if (saved === "en" || saved === "bn") {
        setLocaleState(saved);
      }
    } catch {
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEYS.LOCALE, next);
    } catch {
    }
  }, []);

  const value: AllStateType = {
    localTheme,
    setLocalTheme,
    locale,
    setLocale,
  };

  return (
    <AllStateContext.Provider value={value}>
      {children}
    </AllStateContext.Provider>
  );
};

export default AllStateProvider;
