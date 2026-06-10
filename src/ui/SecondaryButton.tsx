"use client";

import { ButtonProps } from "@/types/ButtonProps";
import { Button } from "@nextui-org/react";
import type { ButtonProps as NextUIButtonProps } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Loading from "./Loading";

/**
 * Secondary / ghost action button.
 * - No longer wrapped in a `<div>`
 * - Subtle scale animation on tap via Framer Motion
 */
const SecondaryButton = ({
  children,
  className,
  href,
  onClick,
  size = "lg",
  radius = "sm",
  color = "primary",
  variant = "ghost",
  isDisabled = false,
  isLoading = false,
  fullWidth = false,
  type = "button",
}: ButtonProps) => {
  return (
    <motion.div
      whileTap={{ scale: isDisabled ? 1 : 0.97 }}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={fullWidth ? "w-full" : "inline-flex"}
    >
      <Button
        as={href ? Link : "button"}
        href={href}
        isDisabled={isDisabled}
        isLoading={isLoading}
        spinner={<Loading size="sm" />}
        size={size}
        radius={radius}
        color={color}
        variant={variant}
        onClick={onClick as unknown as NextUIButtonProps["onClick"]}
        type={type}
        fullWidth={fullWidth}
        className={[
          "font-medium dark:text-light transition-all duration-200",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default SecondaryButton;
