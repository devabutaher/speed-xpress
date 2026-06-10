import { Input } from "@nextui-org/react";
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  label: React.ReactNode;
  name: string;
  register: UseFormRegister<T>;
  error?: Record<string, any>;
  defaultValue?: string;
  variant?: "bordered" | "flat" | "faded";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  type?: string;
  validationRules?: Record<string, any>;
  endContent?: React.ReactNode;
}

function CustomInput<T extends FieldValues>({
  label,
  name,
  register,
  error,
  defaultValue,
  variant = "bordered",
  radius = "sm",
  type = "text",
  endContent,
  validationRules = {},
}: CustomInputProps<T>) {
  const isRequired = !!validationRules.required;
  const hasError = !!error?.[name];
  const errorMessage = hasError ? String(error[name]?.message ?? "") : "";

  return (
    <Input
      {...register(name as FieldPath<T>, validationRules)}
      label={
        <span className="flex items-center gap-0.5">
          {label}
          {isRequired && (
            <span className="text-danger text-sm" aria-hidden="true">
              *
            </span>
          )}
        </span>
      }
      defaultValue={defaultValue}
      variant={variant}
      radius={radius}
      type={type}
      isInvalid={hasError}
      errorMessage={errorMessage}
      endContent={endContent}
      classNames={{
        errorMessage: "text-xs mt-0.5",
      }}
    />
  );
}

export default CustomInput;