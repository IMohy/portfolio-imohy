interface IconProps {
  size?: number;
  className?: string;
}

export function CodeBracketsIcon({ size = 22, className }: IconProps) {
  const h = Math.round(size * 18 / 22);
  return (
    <svg width={size} height={h} viewBox="0 0 22 18" fill="none" className={className}>
      <path
        d="M7 1L1 9L7 17"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M15 1L21 9L15 17"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <line
        x1="13.5" y1="1" x2="8.5" y2="17"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"
      />
    </svg>
  );
}
