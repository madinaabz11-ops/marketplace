import Link from "next/link";
import styles from "./HeroCatalog.module.css";

const priceFormatter = new Intl.NumberFormat("ru-KZ");

export type HeroCatalogItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string | null;
};

export default function HeroCatalog({ items }: { items: HeroCatalogItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <span className={styles.label}>Каталог товаров</span>
        <Link href="/#listings" className={styles.link}>
          Смотреть все →
        </Link>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link key={item.id} href={`/listing/${item.id}`} className={styles.tile}>
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt="" className={styles.tileImage} loading="lazy" />
            ) : (
              <div className={styles.tilePlaceholder} aria-hidden="true" />
            )}
            <div className={styles.tileBody}>
              <p className={styles.tilePrice}>{priceFormatter.format(item.price)} ₸</p>
              <p className={styles.tileTitle}>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
