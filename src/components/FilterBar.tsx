import { CATEGORIES } from "@/lib/constants";
import type { ListingSort } from "@/lib/listings";
import styles from "./FilterBar.module.css";

const SORT_LABELS: Record<ListingSort, string> = {
  new: "Сначала новые",
  old: "Сначала старые",
  price_asc: "Сначала дешёвые",
  price_desc: "Сначала дорогие",
};

export default function FilterBar({
  q,
  category,
  minPrice,
  maxPrice,
  sort,
}: {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: ListingSort;
}) {
  return (
    <form action="/#listings" method="GET" className={`${styles.bar} fade-in-up`} style={{ animationDelay: "0.1s" }}>
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

      <select name="sort" defaultValue={sort ?? "new"} className={styles.select} aria-label="Сортировка">
        {(Object.keys(SORT_LABELS) as ListingSort[]).map((value) => (
          <option key={value} value={value}>
            {SORT_LABELS[value]}
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn--primary">
        Найти
      </button>
    </form>
  );
}
