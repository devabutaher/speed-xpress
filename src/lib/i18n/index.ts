import { useAllState } from "@/hooks/useAllState";
import { bn } from "./bn";
import { en } from "./en";
import type { Dictionary } from "./en";

export type { Dictionary };
export { en, bn };

const dictionaries: Record<string, Dictionary> = { en, bn };

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale] ?? en;
}

export function useTranslation(): Dictionary {
  const { locale } = useAllState();
  return getDictionary(locale);
}

export function interpolate(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{{${key}}}`
  );
}