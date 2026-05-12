"use client";

import { mainNavbarData } from "@/data/navbarData";
import { useAllState } from "@/hooks/useAllState";
import { useAuth } from "@/hooks/useAuth";
import type { Locale } from "@/lib/constants";
import { getDashboardPath } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";
import ThemeSwitch from "@/ui/ThemeSwitch";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import SecondaryButton from "../../ui/SecondaryButton";

// ── Logo ──────────────────────────────────────────────────────────────────────
const Logo = () => (
  <Link
    href="/"
    className="font-extrabold text-xl select-none tracking-tight"
    aria-label="Speed Xpress home"
  >
    SPEED<span className="text-primary">XPRESS</span>
  </Link>
);

// ── Desktop nav link ──────────────────────────────────────────────────────────
const DesktopNavLink = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => (
  <Link
    href={href}
    className={["nav-link text-base font-medium", active ? "active" : ""].join(
      " ",
    )}
  >
    {label}
    {active && (
      <motion.span
        layoutId="nav-underline"
        className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-primary rounded-full"
      />
    )}
  </Link>
);

// ── Mobile menu link ──────────────────────────────────────────────────────────
const MobileNavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="block py-2 text-lg font-medium text-dark dark:text-light hover:text-primary transition-colors duration-200"
  >
    {label}
  </Link>
);

// ── Locale switcher ────────────────────────────────────────────────────────────
const LocaleSwitcher = () => {
  const { locale, setLocale } = useAllState();
  const other: Locale = locale === "en" ? "bn" : "en";

  return (
    <button
      onClick={() => setLocale(other)}
      className="text-sm font-medium px-2.5 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary transition-colors duration-200 select-none"
      aria-label={`Switch to ${other === "bn" ? "Bangla" : "English"}`}
    >
      {other === "bn" ? "বাংলা" : "EN"}
    </button>
  );
};

// ── Main Navbar ───────────────────────────────────────────────────────────────
const MainNavbar = () => {
  const t = useTranslation();
  const { user, role, logOut, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  const handleDashboardClick = () => {
    if (role) router.push(getDashboardPath(role));
  };

  const isActive = (link: string) =>
    link === "/" ? pathname === "/" : pathname.startsWith(link);

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-light/90 dark:bg-dark/90 backdrop-blur-md border-gray-200 dark:border-gray-800"
      maxWidth="xl"
    >
      {/* ── Mobile: toggle + logo ── */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-dark dark:text-light"
        />
        <Logo />
      </NavbarContent>

      {/* ── Desktop: center nav links ── */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {mainNavbarData.map((item) => (
          <NavbarItem key={item.link} isActive={isActive(item.link)}>
            <DesktopNavLink
              href={item.link}
              label={item.name}
              active={isActive(item.link)}
            />
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* ── Desktop: right actions ── */}
      <NavbarContent className="gap-3" justify="end">
        {/* Locale + Theme — always visible */}
        <NavbarItem className="hidden sm:flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeSwitch />
        </NavbarItem>

        {/* Auth buttons */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <div className="w-20 h-9 rounded-md skeleton" />
              <div className="w-24 h-9 rounded-md skeleton" />
            </motion.div>
          ) : user ? (
            <motion.div
              key="authed"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <NavbarItem className="hidden lg:flex">
                <SecondaryButton onClick={logOut} size="sm">
                  {t.nav.logout}
                </SecondaryButton>
              </NavbarItem>
              <NavbarItem>
                <PrimaryButton onClick={handleDashboardClick} size="sm">
                  {t.nav.dashboard}
                </PrimaryButton>
              </NavbarItem>
            </motion.div>
          ) : (
            <motion.div
              key="guest"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <NavbarItem className="hidden lg:flex">
                <SecondaryButton href="/login" size="sm">
                  {t.nav.login}
                </SecondaryButton>
              </NavbarItem>
              <NavbarItem>
                <PrimaryButton href="/register" size="sm">
                  {t.nav.register}
                </PrimaryButton>
              </NavbarItem>
            </motion.div>
          )}
        </AnimatePresence>
      </NavbarContent>

      {/* ── Mobile menu ── */}
      <NavbarMenu className="bg-light/95 dark:bg-dark/95 backdrop-blur-md pt-6 gap-2">
        {mainNavbarData.map((item) => (
          <MobileNavLink
            key={item.link}
            href={item.link}
            label={item.name}
            onClick={closeMenu}
          />
        ))}

        <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

        {/* Auth links in mobile menu — conditional on auth state */}
        {!loading && !user && (
          <>
            <MobileNavLink
              href="/login"
              label={t.nav.login}
              onClick={closeMenu}
            />
            <MobileNavLink
              href="/register"
              label={t.nav.register}
              onClick={closeMenu}
            />
          </>
        )}
        {!loading && user && (
          <>
            <button
              onClick={() => {
                closeMenu();
                handleDashboardClick();
              }}
              className="block py-2 text-lg font-medium text-dark dark:text-light hover:text-primary transition-colors text-left"
            >
              {t.nav.dashboard}
            </button>
            <button
              onClick={() => {
                closeMenu();
                logOut();
              }}
              className="block py-2 text-lg font-medium text-red-500 hover:text-red-600 transition-colors text-left"
            >
              {t.nav.logout}
            </button>
          </>
        )}

        <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

        {/* Theme + locale in mobile menu */}
        <div className="flex items-center justify-between py-2">
          <ThemeSwitch />
          <LocaleSwitcher />
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default MainNavbar;
