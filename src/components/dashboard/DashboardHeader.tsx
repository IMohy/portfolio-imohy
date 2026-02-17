"use client";

import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 glass border-b border-[var(--color-surface-border)]">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="flex-1" />
        <ThemeToggle />
      </div>
    </header>
  );
}
