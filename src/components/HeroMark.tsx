import styles from "./HeroMark.module.css";

export default function HeroMark() {
  return (
    <div className={styles.panel}>
      <span className={`${styles.blob} ${styles.blobA}`} />
      <span className={`${styles.blob} ${styles.blobB}`} />
      <span className={styles.dotGrid} aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} />
        ))}
      </span>

      <svg className={styles.mark} viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <g transform="rotate(-5 100 106)">
          <path
            d="M52 93 100 51l48 42v68H52z"
            fill="var(--lime)"
            filter="url(#markShadow)"
          />
          <path d="M52 93 100 51l48 42" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="86" y="123" width="28" height="38" fill="var(--accent-deep)" />
        </g>
        <defs>
          <filter id="markShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="var(--accent-deep)" floodOpacity="0.35" />
          </filter>
        </defs>
      </svg>

      <span className={styles.ring} />
      <span className={styles.plus} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 4v16M4 12h16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}
