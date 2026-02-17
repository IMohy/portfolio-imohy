interface IconProps {
  size?: number;
  className?: string;
}

export function HexagonIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M4 8L16 2L28 8V24L16 30L4 24V8Z" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
      <path d="M16 2V30" stroke="var(--color-primary)" strokeWidth="1" opacity="0.2" />
      <path d="M4 8L16 14L28 8" stroke="var(--color-primary)" strokeWidth="1" opacity="0.2" />
      <path d="M16 14V30" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="16" cy="16" r="3" fill="var(--color-secondary)" opacity="0.4" />
    </svg>
  );
}
