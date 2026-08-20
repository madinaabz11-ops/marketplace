import type { ReactNode } from "react";
import styles from "./PromoHero.module.css";

const STAT_ICONS: Record<string, ReactNode> = {
  "Электроника": (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.4" />
      <path d="M10 18h4" strokeLinecap="round" />
    </>
  ),
  "Одежда и обувь": (
    <>
      <path d="M9 3H7L4.5 5.5 6 8v13h12V8l1.5-2.5L17 3h-2" strokeLinejoin="round" />
      <path d="M9 3a3 3 0 0 0 6 0" />
    </>
  ),
  "Мебель": (
    <>
      <path d="M6 4v9M18 4v9M6 9h12" strokeLinecap="round" />
      <path d="M5 21l1-8M19 21l-1-8" strokeLinecap="round" />
    </>
  ),
  "Спорт и отдых": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18" />
    </>
  ),
  "Хобби и творчество": (
    <>
      <circle cx="7.5" cy="18" r="2.5" />
      <path d="M10 18V5l9-2v11" strokeLinecap="round" />
      <circle cx="17" cy="14" r="2.5" />
    </>
  ),
};

export type PromoStat = { category: string; count: number };

function pluralizeListing(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "объявление";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "объявления";
  return "объявлений";
}

export default function PromoHero({ stats }: { stats: PromoStat[] }) {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Modern_living_room_with_stylish_furniture_and_a_view_of_the_outdoors_in_a_cozy_apartment_setting.jpg?width=1600"
          alt=""
          className={styles.image}
        />
        <div className={styles.shade} />
      </div>

      <div className={`wrap ${styles.content}`}>
        <p className={`${styles.eyebrow} fade-in-up`}>Wiskons · маркетплейс товаров</p>
        <h1 className={`${styles.title} fade-in-up`} style={{ animationDelay: "0.05s" }}>
          Найдите то,
          <br />
          что искали
        </h1>
        <p className={`${styles.text} fade-in-up`} style={{ animationDelay: "0.1s" }}>
          Мебель, электроника, одежда и другие товары от разных продавцов — в одном каталоге.
        </p>

        <form action="/" method="GET" className={`${styles.search} fade-in-up`} style={{ animationDelay: "0.15s" }}>
          <input type="text" name="q" placeholder="Что вы ищете?" className={styles.searchInput} aria-label="Поиск товаров" />
          <button type="submit" className={styles.searchBtn} aria-label="Найти">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        <div className={`${styles.stats} fade-in-up`} style={{ animationDelay: "0.2s" }}>
          {stats.map(({ category, count }) => (
            <a key={category} href={`/?category=${encodeURIComponent(category)}#listings`} className={styles.stat}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {STAT_ICONS[category]}
              </svg>
              <span>
                <strong>{category}</strong>
                {count} {pluralizeListing(count)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
