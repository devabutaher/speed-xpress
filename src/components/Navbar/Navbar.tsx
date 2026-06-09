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
  Skeleton,
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

  // Route → translation key mapping for nav labels
  const NAV_LABELS: Record<string, string> = {
    "/": t.nav.home,
    "/features": t.nav.features,
    "/blog": t.nav.blog,
    "/about-us": t.nav.about,
    "/contact-us": t.nav.contact,
  };
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
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-light/90 dark:bg-dark/90 backdrop-blur-md border-gray-200 dark:border-gray-800"
      maxWidth="xl"
    >
      {/* ── Mobile: toggle + logo (left) ── */}
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-dark dark:text-light"
        />
        <Logo />
      </NavbarContent>

      {/* ── Mobile: action buttons (right) ── */}
      <NavbarContent className="sm:hidden" justify="end">
        {!loading && !user && (
          <>
            <NavbarItem>
              <SecondaryButton
                href="/login"
                size="sm"
                className="text-xs px-2.5 min-w-fit h-8"
              >
                {t.nav.login}
              </SecondaryButton>
            </NavbarItem>
            <NavbarItem>
              <PrimaryButton
                href="/create-parcel"
                size="sm"
                className="text-xs px-2.5 min-w-fit h-8"
              >
                📦 Parcel
              </PrimaryButton>
            </NavbarItem>
          </>
        )}
        {!loading && user && (
          <NavbarItem>
            <PrimaryButton
              onClick={handleDashboardClick}
              size="sm"
              className="text-xs px-2.5 min-w-fit h-8"
            >
              {t.nav.dashboard}
            </PrimaryButton>
          </NavbarItem>
        )}
        {loading && (
          <Skeleton className="rounded-md w-12 h-8" />
        )}
      </NavbarContent>

      {/* ── Desktop: logo + nav links (left) ── */}
      <NavbarContent className="hidden sm:flex gap-4 lg:gap-8">
        <Logo />
        {mainNavbarData.map((item) => (
          <NavbarItem key={item.link} isActive={isActive(item.link)}>
            <DesktopNavLink
              href={item.link}
              label={NAV_LABELS[item.link] ?? item.name}
              active={isActive(item.link)}
            />
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* ── Desktop: right actions ── */}
      <NavbarContent className="hidden sm:flex gap-3" justify="end">
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
              <Skeleton className="rounded-md w-16 h-9" />
              <Skeleton className="rounded-md w-16 h-9" />
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
              <NavbarItem>
                <PrimaryButton href="/create-parcel" size="sm">
                  📦 Create Parcel
                </PrimaryButton>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <SecondaryButton href="/login" size="sm">
                  {t.nav.login}
                </SecondaryButton>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
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
            label={NAV_LABELS[item.link] ?? item.name}
            onClick={closeMenu}
          />
        ))}

        <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

        {/* Auth links in mobile menu — conditional on auth state */}
        {!loading && !user && (
          <>
            <MobileNavLink
              href="/create-parcel"
              label="📦 Create Parcel"
              onClick={closeMenu}
            />
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
