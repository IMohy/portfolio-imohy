import { GlassCard } from "@/components/portfolio/GlassCard";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <GlassCard className="flex items-center gap-4 p-5">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: `hsla(${color || "var(--color-primary-h)"}, 60%, 50%, 0.15)`,
        }}
      >
        <Icon
          size={24}
          style={{ color: color ? `hsl(${color}, 60%, 50%)` : "var(--color-primary)" }}
        />
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</p>
        <p className="text-sm text-[var(--color-text-muted)]">{title}</p>
      </div>
    </GlassCard>
  );
}
