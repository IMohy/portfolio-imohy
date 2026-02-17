"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-all duration-300 hover:bg-surface hover:text-primary"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon size={20} className="transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
