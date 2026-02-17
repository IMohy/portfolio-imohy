"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, hsla(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l), 0.08), transparent 60%)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "glass-card relative overflow-hidden p-6",
        hover && "hover:translate-y-[-2px]",
        className
      )}
      onMouseMove={glow ? handleMouseMove : undefined}
      onMouseLeave={glow ? handleMouseLeave : undefined}
    >
      {glow && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-0 transition-all duration-300"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
