import { Locale } from "@/lib/constants";

export type AllStateType = {
  localTheme: "light" | "dark";
  setLocalTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  locale: Locale;
  setLocale: (locale: Locale) => void;
};
