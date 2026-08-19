import Link from "next/link";
import type { ReactNode } from "react";
import { CATEGORIES } from "@/lib/constants";
import styles from "./HeroCategories.module.css";

const ICONS: Record<(typeof CATEGORIES)[number], ReactNode> = {
  "Электроника": (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1.2" />
      <path d="M9 19h6M12 16v3" />
    </>
  ),
  "Одежда и обувь": (
    <>
      <path d="M9 4h6l2 3-2.5 1.5V19h-9V8.5L3 7z" />
    </>
  ),
  "Мебель": (
    <>
      <path d="M6 4v8M18 4v8M6 9h12" />
      <path d="M5 19l1-6M19 19l-1-6" />
    </>
  ),
  "Книги": (
    <>
      <path d="M4 5h6v14H4zM14 5h6v14h-6z" />
    </>
  ),
  "Спорт и отдых": (
    <>
      <rect x="2.5" y="9.5" width="3" height="5" rx="0.6" />
      <rect x="18.5" y="9.5" width="3" height="5" rx="0.6" />
      <path d="M5.5 12h13" />
    </>
  ),
  "Детские товары": (
    <>
      <rect x="3" y="11" width="6" height="6" />
      <rect x="10.5" y="11" width="6" height="6" />
      <rect x="6.7" y="4.5" width="6" height="6" />
    </>
  ),
  "Дом и сад": (
    <>
      <path d="M4 11 12 4l8 7v8H4z" />
      <path d="M9 19v-6h6v6" />
    </>
  ),
  "Хобби и творчество": (
    <>
      <path d="M12 4a8 8 0 1 0 0 16c1.5 0 1.5-1.5 0-2s-1.5-2 0-2h1a4 4 0 0 0 4-4c0-4.4-2.7-8-5-8z" />
      <circle cx="8.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="15" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  "Другое": (
    <>
      <circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function HeroCategories() {
  return (
    <div className={styles.panel}>
      <p className={styles.label}>Категории</p>
      <div className={styles.grid}>
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/?category=${encodeURIComponent(category)}#listings`}
            className={styles.tile}
          >
            <span className={styles.badge}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[category]}
              </svg>
            </span>
            <span className={styles.tileLabel}>{category}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
