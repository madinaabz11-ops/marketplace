import type { ReactNode } from "react";
import styles from "./HeroMark.module.css";

const ICONS: { path: ReactNode; className: string }[] = [
  {
    className: styles.i1,
    path: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2.4" />
        <path d="M10 18h4" strokeLinecap="round" />
      </>
    ),
  },
  {
    className: styles.i2,
    path: (
      <>
        <path d="M3 12V4h9l9 9-9 9-9-9z" strokeLinejoin="round" />
        <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    className: styles.i3,
    path: (
      <>
        <path
          d="M9 3H7L4.5 5.5 6 8v13h12V8l1.5-2.5L17 3h-2"
          strokeLinejoin="round"
        />
        <path d="M9 3a3 3 0 0 0 6 0" />
      </>
    ),
  },
  {
    className: styles.i4,
    path: (
      <>
        <path d="M6 4v9M18 4v9M6 9h12" strokeLinecap="round" />
        <path d="M5 21l1-8M19 21l-1-8" strokeLinecap="round" />
      </>
    ),
  },
  {
    className: styles.i5,
    path: (
      <>
        <path d="M4 5h7v14H4zM13 5h7v14h-7z" strokeLinejoin="round" />
      </>
    ),
  },
  {
    className: styles.i6,
    path: (
      <>
        <circle cx="7.5" cy="18" r="2.5" />
        <path d="M10 18V5l9-2v11" strokeLinecap="round" />
        <circle cx="17" cy="14" r="2.5" />
      </>
    ),
  },
];

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

      {ICONS.map((icon, i) => (
        <svg
          key={i}
          className={`${styles.icon} ${icon.className}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          {icon.path}
        </svg>
      ))}
    </div>
  );
}
