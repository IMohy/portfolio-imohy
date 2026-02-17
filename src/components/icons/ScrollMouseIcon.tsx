interface IconProps {
  className?: string;
}

export function ScrollMouseIcon({ className }: IconProps) {
  return (
    <svg width="24" height="38" viewBox="0 0 24 38" fill="none" className={className}>
      <rect
        x="1" y="1" width="22" height="36" rx="11"
        stroke="var(--color-text-muted)" strokeWidth="1.5" opacity="0.4"
      />
      <circle cx="12" cy="10" r="2" fill="var(--color-primary)" className="scroll-dot" />
    </svg>
  );
}
