"use client";

import { ChildrenProps } from "@/types/ChildrenProps";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

const AUTH_IMAGES: Record<string, { src: string; alt: string; width: number }> =
  {
    "/login": {
      src: "/assets/images/login.png",
      alt: "Person logging into Speed Xpress",
      width: 480,
    },
    "/register": {
      src: "/assets/images/register.png",
      alt: "Person registering a Speed Xpress account",
      width: 560,
    },
    "/password": {
      src: "/assets/images/reset.png",
      alt: "Password reset illustration",
      width: 480,
    },
  };

const DEFAULT_IMAGE = AUTH_IMAGES["/login"];

const AuthLayout = ({ children }: ChildrenProps) => {
  const pathname = usePathname();

  // Match by the last segment so nested routes work too
  const imageConfig =
    Object.entries(AUTH_IMAGES).find(([key]) => pathname.endsWith(key))?.[1] ??
    DEFAULT_IMAGE;

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 container-xl py-12 lg:py-20 lg:place-items-center gap-10">
      {/* Illustration — hidden on mobile */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex items-center justify-start"
      >
        <Image
          src={imageConfig.src}
          width={imageConfig.width}
          height={imageConfig.width}
          alt={imageConfig.alt}
          priority
          className="w-full max-w-md drop-shadow-xl"
        />
      </motion.div>

      {/* Form */}
      <motion.div
        key={`form-${pathname}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="lg:justify-self-end w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
