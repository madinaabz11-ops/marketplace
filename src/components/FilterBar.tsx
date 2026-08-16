import { CATEGORIES, CITIES } from "@/lib/constants";
import styles from "./FilterBar.module.css";

export default function FilterBar({
  q,
  category,
  city,
  minPrice,
  maxPrice,
}: {
  q?: string;
  category?: string;
  city?: string;
  minPrice?: string;
  maxPrice?: string;
}) {
  return (
    <form action="/" method="GET" className={`${styles.bar} fade-in-up`} style={{ animationDelay: "0.1s" }}>
      <input
        type="text"
        name="q"
        defaultValue={q}
        placeholder="Что ищете?"
        className={styles.search}
        aria-label="Поиск по названию и описанию"
      />

      <select name="category" defaultValue={category ?? ""} className={styles.select} aria-label="Категория">
        <option value="">Все категории</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select name="city" defaultValue={city ?? ""} className={styles.select} aria-label="Город">
        <option value="">Любой город</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className={styles.priceRange}>
        <input
          type="number"
          name="minPrice"
          defaultValue={minPrice}
          placeholder="Цена от"
          min={0}
          className={styles.priceInput}
          aria-label="Цена от"
        />
        <span className={styles.priceDash} aria-hidden="true">-</span>
        <input
          type="number"
          name="maxPrice"
          defaultValue={maxPrice}
          placeholder="Цена до"
          min={0}
          className={styles.priceInput}
          aria-label="Цена до"
        />
      </div>

      <button type="submit" className="btn btn--primary">
        Найти
      </button>
    </form>
  );
}
