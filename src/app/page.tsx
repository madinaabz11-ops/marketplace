import { getListings, getCategoryCounts, type ListingSort } from "@/lib/listings";
import { getCurrentUser } from "@/lib/auth";
import { getCartListingIds } from "@/lib/cart";
import { getFavoriteListingIds } from "@/lib/favorites";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import PromoHero from "@/components/PromoHero";
import styles from "./page.module.css";

const HERO_STAT_CATEGORIES = ["Электроника", "Одежда и обувь", "Мебель", "Спорт и отдых", "Хобби и творчество"];

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
  const [listings, cartListingIds, favoriteListingIds, heroStats] = await Promise.all([
    getListings({ q, category, minPrice, maxPrice, sort }),
    getCartListingIds(user?.id),
    getFavoriteListingIds(user?.id),
    getCategoryCounts(HERO_STAT_CATEGORIES),
  ]);
  const hasFilters = Boolean(q || category || minPrice || maxPrice);

  return (
    <>
      <PromoHero stats={heroStats} />

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
