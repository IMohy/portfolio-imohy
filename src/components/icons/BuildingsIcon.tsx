interface IconProps {
  size?: number;
  className?: string;
}

export function BuildingsIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="4" y="10" width="11" height="20" rx="2" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
      <rect x="17" y="4" width="11" height="26" rx="2" stroke="var(--color-secondary)" strokeWidth="1.5" opacity="0.5" />
      <rect x="7" y="14" width="2.5" height="2.5" rx="0.5" fill="var(--color-primary)" opacity="0.5" />
      <rect x="7" y="19" width="2.5" height="2.5" rx="0.5" fill="var(--color-primary)" opacity="0.5" />
      <rect x="7" y="24" width="2.5" height="2.5" rx="0.5" fill="var(--color-primary)" opacity="0.5" />
      <rect x="20" y="8" width="2.5" height="2.5" rx="0.5" fill="var(--color-secondary)" opacity="0.5" />
      <rect x="20" y="13" width="2.5" height="2.5" rx="0.5" fill="var(--color-secondary)" opacity="0.5" />
      <rect x="20" y="18" width="2.5" height="2.5" rx="0.5" fill="var(--color-secondary)" opacity="0.5" />
      <rect x="24" y="8" width="2.5" height="2.5" rx="0.5" fill="var(--color-secondary)" opacity="0.3" />
      <rect x="24" y="13" width="2.5" height="2.5" rx="0.5" fill="var(--color-secondary)" opacity="0.3" />
    </svg>
  );
}
