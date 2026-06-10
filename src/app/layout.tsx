import AllProvider from "@/providers/AllProvider";
import NextThemeProvider from "@/providers/NextThemeProvider";
import { ChildrenProps } from "@/types/ChildrenProps";
import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_CLIENT_URL ?? "https://speedxpress.vercel.app",
  ),
  title: {
    default: "Speed Xpress — Swift Parcel Management",
    template: "%s | Speed Xpress",
  },
  description:
    "Send, receive, and track parcels with ease. Tailored dashboards for customers, merchants, admins, and riders. Your shortcut to efficient parcel management.",
  keywords: [
    "parcel management",
    "courier service",
    "parcel tracking",
    "delivery",
    "Bangladesh courier",
    "পার্সেল ডেলিভারি",
  ],
  authors: [{ name: "Speed Xpress Team" }],
  creator: "Speed Xpress",
  publisher: "Speed Xpress",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "bn_BD",
    siteName: "Speed Xpress",
    title: "Speed Xpress — Swift Parcel Management",
    description:
      "Send, receive, and track parcels with ease. Tailored dashboards for customers, merchants, admins, and riders.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Speed Xpress — Swift Parcel Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speed Xpress — Swift Parcel Management",
    description:
      "Send, receive, and track parcels with ease. Tailored dashboards for customers, merchants, admins, and riders.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`
          ${inter.variable}
          ${notoSansBengali.variable}
          font-sans
          min-h-screen
          bg-light dark:bg-dark
          text-dark dark:text-light
          antialiased
        `}
      >
        <AllProvider>
          <NextThemeProvider>{children}</NextThemeProvider>
        </AllProvider>
      </body>
    </html>
  );
}
