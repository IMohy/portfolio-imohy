import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md transition-all duration-200",
        {
          "bg-[var(--glass-bg)] border border-[var(--color-surface-border)] text-[var(--color-text-secondary)]":
            variant === "default",
          "bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/25 text-[var(--color-primary)]":
            variant === "primary",
          "bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/25 text-[var(--color-secondary)]":
            variant === "secondary",
          "bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/25 text-[var(--color-accent)]":
            variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
