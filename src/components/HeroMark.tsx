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
        <path d="M9 3H7L4.5 5.5 6 8v13h12V8l1.5-2.5L17 3h-2" strokeLinejoin="round" />
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
    path: <path d="M4 5h7v14H4zM13 5h7v14h-7z" strokeLinejoin="round" />,
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
  {
    className: styles.i7,
    path: (
      <path
        d="M3 19v-3c2-1 3-2 4-4l2-2h3l5 3h3a2 2 0 0 1 2 2v4z"
        strokeLinejoin="round"
      />
    ),
  },
  {
    className: styles.i8,
    path: (
      <>
        <path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" strokeLinejoin="round" />
        <path d="M16 9h1.5a2 2 0 0 1 0 4H16" />
      </>
    ),
  },
  {
    className: styles.i9,
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18" />
      </>
    ),
  },
  {
    className: styles.i10,
    path: (
      <>
        <rect x="3" y="12" width="7" height="7" />
        <rect x="12" y="12" width="7" height="7" />
        <rect x="7.5" y="5" width="7" height="7" />
      </>
    ),
  },
  {
    className: styles.i11,
    path: (
      <>
        <path d="M4 11 12 4l8 7v9H4z" strokeLinejoin="round" />
        <path d="M12 20v-5" strokeLinecap="round" />
      </>
    ),
  },
  {
    className: styles.i12,
    path: (
      <path
        d="M12 3.5 14 9h5.5l-4.5 3.4L16.7 18 12 14.6 7.3 18l1.7-5.6L4.5 9H10z"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function HeroMark() {
  return (
    <div className={styles.panel}>
      {ICONS.map((icon, i) => (
        <svg
          key={i}
          className={`${styles.icon} ${icon.className}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          {icon.path}
        </svg>
      ))}
    </div>
  );
}
