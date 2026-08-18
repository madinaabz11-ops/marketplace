import { getListings } from "@/lib/listings";
import { getCurrentUser } from "@/lib/auth";
import { getCartListingIds } from "@/lib/cart";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import HeroGraphic from "@/components/HeroGraphic";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const city = typeof sp.city === "string" ? sp.city : undefined;
  const minPrice = typeof sp.minPrice === "string" ? sp.minPrice : undefined;
  const maxPrice = typeof sp.maxPrice === "string" ? sp.maxPrice : undefined;

  const user = await getCurrentUser();
  const [listings, cartListingIds] = await Promise.all([
    getListings({ q, category, city, minPrice, maxPrice }),
    getCartListingIds(user?.id),
  ]);
  const hasFilters = Boolean(q || category || city || minPrice || maxPrice);

  return (
    <>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroInner}`}>
          <div className="fade-in-up">
            <p className="eyebrow">Wiskons</p>
            <h1 className={`h1 ${styles.heroTitle}`}>
              Маркетплейс <span className={styles.heroAccent}>товаров</span>
            </h1>
            <p className={styles.heroText}>
              Новые товары от разных продавцов в одном месте - выбирайте по категории, цене и городу.
            </p>
          </div>
          <div className={`${styles.heroGraphic} fade-in-up`} style={{ animationDelay: "0.15s" }}>
            <HeroGraphic />
          </div>
        </div>
      </section>

      <section id="listings" className={`wrap ${styles.listings}`}>
        <FilterBar q={q} category={category} city={city} minPrice={minPrice} maxPrice={maxPrice} />

        <div className={styles.resultsHead}>
          <h2 className="h2">{hasFilters ? "Результаты поиска" : "Свежие объявления"}</h2>
          <span className={styles.count}>{listings.length}</span>
        </div>

        {listings.length === 0 ? (
          <div className={styles.empty}>
            <p>Ничего не нашлось. Попробуйте изменить фильтры.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {listings.map((listing, i) => (
              <div key={listing.id} className="fade-in-up" style={{ animationDelay: `${Math.min(i, 10) * 0.05}s` }}>
                <ListingCard listing={listing} currentUserId={user?.id} inCart={cartListingIds.has(listing.id)} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
