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
          "bg-(--glass-bg) border border-surface-border text-text-secondary":
            variant === "default",
          "bg-primary/15 border border-primary/25 text-primary":
            variant === "primary",
          "bg-secondary/15 border border-secondary/25 text-secondary":
            variant === "secondary",
          "bg-accent/15 border border-accent/25 text-accent":
            variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
