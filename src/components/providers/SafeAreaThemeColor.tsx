"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const THEME_COLORS: Record<string, string> = {
  light: "#eef2f7",
  dark: "#090d16",
};

export function SafeAreaThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = THEME_COLORS[resolvedTheme ?? "dark"] ?? THEME_COLORS.dark;

    const metas = document.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );

    if (metas.length > 0) {
      metas.forEach((meta) => {
        meta.setAttribute("content", color);
        meta.removeAttribute("media");
      });
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = color;
      document.head.appendChild(meta);
    }
  }, [resolvedTheme]);

  return null;
}
