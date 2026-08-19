import { getListings, type ListingSort } from "@/lib/listings";
import { getCurrentUser } from "@/lib/auth";
import { getCartListingIds } from "@/lib/cart";
import { getFavoriteListingIds } from "@/lib/favorites";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import HeroCategories from "@/components/HeroCategories";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const minPrice = typeof sp.minPrice === "string" ? sp.minPrice : undefined;
  const maxPrice = typeof sp.maxPrice === "string" ? sp.maxPrice : undefined;
  const sortOptions: ListingSort[] = ["new", "old", "price_asc", "price_desc"];
  const sort = sortOptions.includes(sp.sort as ListingSort) ? (sp.sort as ListingSort) : undefined;

  const user = await getCurrentUser();
  const [listings, cartListingIds, favoriteListingIds] = await Promise.all([
    getListings({ q, category, minPrice, maxPrice, sort }),
    getCartListingIds(user?.id),
    getFavoriteListingIds(user?.id),
  ]);
  const hasFilters = Boolean(q || category || minPrice || maxPrice);

  return (
    <>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroInner}`}>
          <div className="fade-in-up">
            <div className={styles.heroWordmark}>
              <h1 className={styles.heroName}>Wiskons</h1>
              <svg className={styles.heroSquiggle} viewBox="0 0 180 16" fill="none" aria-hidden="true">
                <path
                  d="M2 9c15-11 27-11 42 0s27 11 42 0 27-11 42 0 27 11 40 1"
                  stroke="var(--lime)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className={styles.heroTagline}>маркетплейс</p>
            <p className={styles.heroText}>
              Новые товары от разных продавцов в одном месте - выбирайте по категории и цене.
            </p>
          </div>
          <div className={`${styles.heroGraphic} fade-in-up`} style={{ animationDelay: "0.15s" }}>
            <HeroCategories />
          </div>
        </div>
      </section>

      <section id="listings" className={`wrap ${styles.listings}`}>
        <FilterBar q={q} category={category} minPrice={minPrice} maxPrice={maxPrice} sort={sort} />

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
                <ListingCard
                  listing={listing}
                  currentUserId={user?.id}
                  inCart={cartListingIds.has(listing.id)}
                  isFavorite={favoriteListingIds.has(listing.id)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
