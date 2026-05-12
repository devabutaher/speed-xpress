import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
  FieldPath,
} from "react-hook-form";

export type CustomInputProps<T extends FieldValues = FieldValues> = {
  label: React.ReactNode;
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  error?: DeepMap<T, FieldError>;
  variant?: "bordered" | "flat" | "faded";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  type?: string;
  validationRules?: Record<string, any>;
  defaultValue?: string;
  endContent?: React.ReactNode;
};
