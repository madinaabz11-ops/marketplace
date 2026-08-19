import styles from "./HeroMark.module.css";

export default function HeroMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 360 360" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="var(--accent-pale)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent-pale)" stopOpacity="0" />
        </radialGradient>
        <filter id="markShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="var(--ink)" floodOpacity="0.18" />
        </filter>
      </defs>

      <circle cx="184" cy="176" r="150" fill="url(#heroGlow)" />
      <circle cx="184" cy="176" r="146" stroke="var(--line-soft)" strokeWidth="1.5" strokeDasharray="2 8" />

      <g transform="rotate(-5 184 190)">
        <path d="M94 168 184 92l90 76v122H94z" fill="var(--accent-deep)" filter="url(#markShadow)" />
        <path d="M94 168 184 92l90 76" stroke="var(--lime)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="159" y="222" width="50" height="66" fill="var(--lime)" />
      </g>

      <circle cx="308" cy="96" r="17" fill="var(--lime)" />
      <circle cx="52" cy="270" r="12" stroke="var(--accent)" strokeWidth="3" />
      <rect x="290" y="252" width="15" height="15" fill="var(--accent)" transform="rotate(45 297 259)" />
      <rect x="40" y="90" width="11" height="11" fill="var(--lime-deep)" transform="rotate(45 45 95)" />
      <path d="M296 176h30M311 161v30" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
