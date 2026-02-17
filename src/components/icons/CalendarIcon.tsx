interface IconProps {
  size?: number;
  className?: string;
}

export function CalendarIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="2" y="4" width="28" height="26" rx="4" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
      <line x1="2" y1="11" x2="30" y2="11" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.3" />
      <circle cx="10" cy="19" r="2" fill="var(--color-primary)" opacity="0.8" />
      <circle cx="16" cy="19" r="2" fill="var(--color-secondary)" opacity="0.5" />
      <circle cx="22" cy="19" r="2" fill="var(--color-primary)" opacity="0.3" />
      <line x1="9" y1="2" x2="9" y2="6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="23" y1="2" x2="23" y2="6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
