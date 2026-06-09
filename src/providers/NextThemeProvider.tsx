"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

const NextThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default NextThemeProvider;
