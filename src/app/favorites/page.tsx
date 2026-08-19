import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getFavoriteListings } from "@/lib/favorites";
import { getCartListingIds } from "@/lib/cart";
import ListingCard from "@/components/ListingCard";
import styles from "./page.module.css";

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [favorites, cartListingIds] = await Promise.all([
    getFavoriteListings(user.id),
    getCartListingIds(user.id),
  ]);

  return (
    <section className={`wrap ${styles.page}`}>
      <p className="eyebrow">Избранное</p>
      <h1 className={`h1 ${styles.title}`}>Сохранённые товары</h1>

      {favorites.length === 0 ? (
        <p className={styles.empty}>
          Пока пусто.{" "}
          <Link href="/" className="link">
            Посмотреть объявления
          </Link>
        </p>
      ) : (
        <div className={styles.grid}>
          {favorites.map(({ listing }) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currentUserId={user.id}
              inCart={cartListingIds.has(listing.id)}
              isFavorite
            />
          ))}
        </div>
      )}
    </section>
  );
}
