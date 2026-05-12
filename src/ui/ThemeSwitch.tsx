"use client";

import { useAllState } from "@/hooks/useAllState";
import { Switch } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ── SVG icons ─────────────────────────────────────────────────────────────────
const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    className={className}
    fill="currentColor"
  >
    <path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z" />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    viewBox="0 0 24 24"
    width="1em"
    className={className}
    fill="currentColor"
  >
    <g>
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
const ThemeSwitch = () => {
  const { setLocalTheme } = useAllState();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder that matches the switch size to avoid layout shift
    return (
      <div className="w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  const handleChange = (selected: boolean) => {
    const next = selected ? "dark" : "light";
    setTheme(next);
    setLocalTheme(next);
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <Switch
        isSelected={isDark}
        onValueChange={handleChange}
        size="md"
        color="primary"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <MoonIcon className={className} />
          ) : (
            <SunIcon className={className} />
          )
        }
      />
      {/* <motion.span
        key={isDark ? "dark" : "light"}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.15 }}
        className="text-sm font-medium capitalize text-gray-600 dark:text-gray-400 select-none"
      >
        {isDark ? "Dark" : "Light"}
      </motion.span> */}
    </motion.div>
  );
};

export default ThemeSwitch;
