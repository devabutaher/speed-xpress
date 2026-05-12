"use client";

import {
  adminDropdownData,
  adminNavbarData,
  dropdownData,
  merchantNavbarData,
  regularNavbarData,
  riderNavbarData,
} from "@/data/navbarData";
import { useAllState } from "@/hooks/useAllState";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath, type Locale } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";
import { NavbarDataType } from "@/types/NavbarDataType";
import PrimaryButton from "@/ui/PrimaryButton";
import ThemeSwitch from "@/ui/ThemeSwitch";
import {
  Avatar,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// ── Role → nav items map ──────────────────────────────────────────────────────
const NAV_DATA_MAP: Record<string, NavbarDataType[]> = {
  regular: regularNavbarData,
  merchant: merchantNavbarData,
  rider: riderNavbarData,
  admin: adminNavbarData,
};

// ── Locale switcher ────────────────────────────────────────────────────────────
const LocaleSwitcher = () => {
  const { locale, setLocale } = useAllState();
  const other: Locale = locale === "en" ? "bn" : "en";
  return (
    <button
      onClick={() => setLocale(other)}
      className="text-xs font-medium px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary transition-colors select-none"
    >
      {other === "bn" ? "বাংলা" : "EN"}
    </button>
  );
};

// ── Dashboard Navbar ──────────────────────────────────────────────────────────
const DashboardNavbar = () => {
  const t = useTranslation();
  const { user, role, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navbarData = role ? (NAV_DATA_MAP[role] ?? []) : [];

  const isActive = (link: string) =>
    pathname === link || pathname.startsWith(link + "/");

  const dropdownItems = role === "admin" ? adminDropdownData : dropdownData;

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-light/90 dark:bg-dark/90 backdrop-blur-md border-gray-200 dark:border-gray-800"
      maxWidth="xl"
    >
      {/* ── Mobile toggle + logo ── */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <Link
          href="/"
          className="font-extrabold text-xl select-none tracking-tight hidden sm:inline-block"
        >
          SPEED<span className="text-primary">XPRESS</span>
        </Link>
      </NavbarContent>

      {/* ── Desktop nav links (right-aligned) ── */}
      <NavbarContent className="sm:flex gap-3" justify="end">
        {/* Nav links - hidden on mobile, shown on lg+ */}
        <div className="hidden lg:flex items-center gap-6">
          {navbarData.map((item) => {
            const active = isActive(item.link);
            return (
              <NavbarItem key={item.link} isActive={active}>
                <Link
                  href={item.link}
                  className={[
                    "relative text-sm font-medium transition-colors duration-200",
                    "hover:text-primary",
                    active ? "text-primary" : "text-dark dark:text-light",
                  ].join(" ")}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="dash-nav-underline"
                      className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-primary rounded-full"
                    />
                  )}
                </Link>
              </NavbarItem>
            );
          })}
        </div>

        {/* Create parcel CTA (not for riders) */}
        {role !== "rider" && (
          <NavbarItem>
            <PrimaryButton
              href={getDashboardPath(role, "/create-parcel")}
              size="sm"
            >
              {t.nav.createParcel}
            </PrimaryButton>
          </NavbarItem>
        )}

        {/* Theme + locale */}
        <NavbarItem className="hidden md:flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeSwitch />
        </NavbarItem>

        {/* Avatar dropdown */}
        <Dropdown placement="bottom-end" backdrop="opaque" showArrow>
          <DropdownTrigger className="cursor-pointer">
            <Avatar
              size="sm"
              as="button"
              isBordered
              showFallback
              src={user?.photoURL ?? ""}
              name={user?.displayName ?? undefined}
              className="transition-transform hover:scale-105 text-gray-600 dark:text-light"
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile actions" variant="flat">
            {/* Email header */}
            <DropdownSection aria-label="Account" showDivider>
              <DropdownItem
                key="email"
                className="h-14 gap-2 cursor-default"
                textValue={user?.email ?? ""}
                isReadOnly
              >
                <p className="text-xs text-gray-500">Signed in as</p>
                <p className="font-semibold text-sm truncate max-w-[200px]">
                  {user?.email}
                </p>
                {user?.emailVerified && (
                  <Checkbox
                    defaultSelected
                    radius="full"
                    size="sm"
                    isReadOnly
                    className="mt-1"
                  >
                    <span className="text-xs text-green-500">Verified</span>
                  </Checkbox>
                )}
              </DropdownItem>
            </DropdownSection>

            {/* Navigation links */}
            <DropdownSection aria-label="Navigation" showDivider>
              {dropdownItems.map((item) => (
                <DropdownItem
                  key={item.name}
                  as={Link}
                  href={
                    role === "admin"
                      ? `/dashboard/admin${item.link}`
                      : `/dashboard/${role}${item.link}`
                  }
                  textValue={item.name}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownSection>

            {/* Sign out */}
            <DropdownSection aria-label="Actions">
              <DropdownItem
                key="logout"
                onClick={logOut}
                className="text-danger"
                color="danger"
                textValue="Sign out"
              >
                Sign Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* ── Mobile menu ── */}
      <NavbarMenu className="bg-light/95 dark:bg-dark/95 backdrop-blur-md pt-6 gap-1">
        {navbarData.map((item) => {
          const active = isActive(item.link);
          return (
            <Link
              key={item.link}
              href={item.link}
              onClick={() => setIsMenuOpen(false)}
              className={[
                "block py-2.5 px-3 rounded-lg text-base font-medium transition-colors duration-200",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-dark dark:text-light hover:bg-gray-100 dark:hover:bg-gray-800",
              ].join(" ")}
            >
              {item.name}
            </Link>
          );
        })}

        <div className="border-t border-gray-200 dark:border-gray-800 my-3" />

        {/* Theme + locale in mobile */}
        <div className="flex items-center justify-between px-3 py-2">
          <ThemeSwitch />
          <LocaleSwitcher />
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default DashboardNavbar;
