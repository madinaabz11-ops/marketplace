export default function HeroGraphic() {
  return (
    <svg viewBox="0 0 320 320" fill="none" aria-hidden="true">
      <circle cx="160" cy="160" r="128" stroke="var(--line-soft)" strokeWidth="1.5" strokeDasharray="3 7" />

      <rect
        x="36"
        y="64"
        width="168"
        height="168"
        stroke="var(--accent)"
        strokeWidth="2.5"
        transform="rotate(-14 120 148)"
      />

      <rect x="150" y="112" width="118" height="118" fill="var(--lime)" transform="rotate(16 209 171)" />

      <rect x="18" y="222" width="188" height="16" fill="var(--accent)" transform="rotate(-18 112 230)" />

      <circle cx="256" cy="76" r="16" fill="var(--lime)" />
      <circle cx="54" cy="252" r="11" stroke="var(--accent)" strokeWidth="2.5" />

      <rect x="264" y="200" width="13" height="13" fill="var(--lime)" transform="rotate(45 270 206)" />
      <rect x="34" y="46" width="9" height="9" fill="var(--accent)" transform="rotate(45 38 50)" />

      <path d="M14 150 h26 M27 137 v26" stroke="var(--lime)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
