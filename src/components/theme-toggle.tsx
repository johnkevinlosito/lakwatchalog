"use client";

import React from "react";
import { ThemeSwitcher } from "./ui/kibo-ui/theme-switcher";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeSwitcher
      defaultValue="system"
      onChange={setTheme}
      value={theme as "light" | "dark" | "system" | undefined}
    />
  );
};

export default ThemeToggle;
