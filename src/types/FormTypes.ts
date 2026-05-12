// src/types/FormTypes.ts
import { Role } from "@/lib/constants";

// ── Register ──────────────────────────────────────────────────────────────────
export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  number: string;
  address: string;
  shopName?: string;
};

type UserDataType = {
  photoURL: string;
  /** Typed Role instead of loose string */
  role: Role;
  division: string;
  district: string;
  vehicle?: string;
};

type RegisterFormWithoutPassword = Omit<RegisterFormType, "password">;

export type RegisterUserDataType = RegisterFormWithoutPassword & UserDataType;

// ── Select component prop types ───────────────────────────────────────────────
export type DivisionPropsType = {
  variant?: "flat" | "faded" | "bordered";
  division: string;
  setDivision: React.Dispatch<React.SetStateAction<string>>;
  setDistrict: React.Dispatch<React.SetStateAction<string>>;
};

export type DistrictPropsType = {
  variant?: "flat" | "faded" | "bordered";
  district: string;
  division: string;
  setDistrict: React.Dispatch<React.SetStateAction<string>>;
};

export type VehiclePropsType = {
  variant?: "flat" | "faded" | "bordered";
  vehicle: string;
  setVehicle: React.Dispatch<React.SetStateAction<string>>;
};

// ── Profile ───────────────────────────────────────────────────────────────────
export type ProfileFormType = {
  name: string;
  number: string;
  address: string;
  division?: string;
  district?: string;
};

export type OnCloseProps = {
  onClose: () => void;
};

// ── Parcel update (recipient fields only) ────────────────────────────────────
export type ParcelFormType = {
  name: string;
  email: string;
  number: string;
  address: string;
  description: string;
};

// ── Parcel create (full form) ─────────────────────────────────────────────────
export type ParcelDataType = {
  address: string;
  email: string;
  name: string;
  number: string;
  /** String from the weight <Select> — e.g. "0.5", "5" */
  quantity: string;
  weight: string;
  description: string;
};

// ── Modal ─────────────────────────────────────────────────────────────────────
export type ModalFormProps = {
  onClose: () => void;
  id: string;
};
