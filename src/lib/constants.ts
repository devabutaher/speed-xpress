export const ROLES = {
  REGULAR: "regular",
  MERCHANT: "merchant",
  RIDER: "rider",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ALL_ROLES = Object.values(ROLES) as Role[];

export const DASHBOARD_ROOT: Record<Role, string> = {
  regular: "/dashboard/regular",
  merchant: "/dashboard/merchant",
  rider: "/dashboard/rider",
  admin: "/dashboard/admin",
};

export const getDashboardPath = (role: Role | null, path = ""): string => {
  if (!role) return "/login";
  return `${DASHBOARD_ROOT[role]}${path}`;
};

export const PARCEL_STATUS = {
  PENDING: "pending",
  PICKED_UP: "picked_up",
  IN_TRANSIT: "in_transit",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
} as const;

export type ParcelStatus = (typeof PARCEL_STATUS)[keyof typeof PARCEL_STATUS];

export const PARCEL_STATUS_LABELS: Record<ParcelStatus, string> = {
  pending: "Pending",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

export const PARCEL_STATUS_CLASS: Record<ParcelStatus, string> = {
  pending: "status-pending",
  picked_up: "status-active",
  in_transit: "status-active",
  out_for_delivery: "status-active",
  delivered: "status-delivered",
  cancelled: "status-cancelled",
  returned: "status-cancelled",
};

export const INVOICE_STATUS = {
  UNPAID: "unpaid",
  PAID: "paid",
  REFUNDED: "refunded",
} as const;

export type InvoiceStatus =
  (typeof INVOICE_STATUS)[keyof typeof INVOICE_STATUS];

export const APP_CONFIG = {
  name: "Speed Xpress",
  shortName: "SX",
  tagline: "Swift, Secure, Seamless",
  phone: "+880 1626441900",
  email: "code.abutaher@gmail.com",
  supportedLocales: ["en", "bn"] as const,
  defaultLocale: "en" as const,
} as const;

export type Locale = (typeof APP_CONFIG.supportedLocales)[number];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50],
} as const;

export const QUERY_KEYS = {
  parcels: (userId?: string) =>
    userId ? ["parcels", userId] : (["parcels"] as const),
  parcel: (id: string) => ["parcels", id] as const,
  invoices: (userId?: string) =>
    userId ? ["invoices", userId] : (["invoices"] as const),
  invoice: (id: string) => ["invoices", id] as const,
  users: () => ["users"] as const,
  user: (id: string) => ["users", id] as const,
  shops: (merchantId?: string) =>
    merchantId ? ["shops", merchantId] : (["shops"] as const),
  userInfo: (email?: string) =>
    email ? ["userInfo", email] : (["userInfo"] as const),
} as const;

export const STORAGE_KEYS = {
  LOCALE: "sx-locale",
  THEME: "sx-theme",
} as const;
