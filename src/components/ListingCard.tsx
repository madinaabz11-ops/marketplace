import Link from "next/link";
import { addToCartAction, removeFromCartAction } from "@/lib/actions/cart";
import { addToFavoritesAction, removeFromFavoritesAction } from "@/lib/actions/favorites";
import styles from "./ListingCard.module.css";

export type ListingCardData = {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string | null;
  sellerId: string;
  status: string;
};

const priceFormatter = new Intl.NumberFormat("ru-KZ");

export default function ListingCard({
  listing,
  currentUserId,
  inCart,
  isFavorite,
}: {
  listing: ListingCardData;
  currentUserId?: string;
  inCart?: boolean;
  isFavorite?: boolean;
}) {
  const canAddToCart = Boolean(currentUserId) && currentUserId !== listing.sellerId && listing.status === "active";
  const canFavorite = Boolean(currentUserId) && currentUserId !== listing.sellerId;

  return (
    <div className={styles.card}>
      {canFavorite && (
        <form
          action={(isFavorite ? removeFromFavoritesAction : addToFavoritesAction).bind(null, listing.id)}
          className={styles.favForm}
        >
          <button
            type="submit"
            className={`${styles.favBtn} ${isFavorite ? styles.favBtnActive : ""}`}
            aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
            title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          >
            <svg viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} aria-hidden="true">
              <path
                d="M12 20.5s-7.5-4.6-9.8-9.3C.7 7.9 2.2 4.5 5.6 3.7c2-.5 4 .3 5.2 2.1a.9.9 0 0 0 1.4 0c1.2-1.8 3.2-2.6 5.2-2.1 3.4.8 4.9 4.2 3.4 7.5-2.3 4.7-9.8 9.3-9.8 9.3z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      )}

      <Link href={`/listing/${listing.id}`} className={styles.cardLink}>
        <div className={styles.imageWrap}>
          {listing.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={listing.imageUrl} alt={listing.title} className={styles.image} loading="lazy" />
          ) : (
            <div className={styles.placeholder} aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <path d="M12 24 32 12l20 12v24H12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M24 48V32h16v16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          <span className={styles.category}>{listing.category}</span>
        </div>
        <div className={styles.body}>
          <p className={styles.price}>{priceFormatter.format(listing.price)} ₸</p>
          <p className={styles.title}>{listing.title}</p>
        </div>
      </Link>

      {canAddToCart && (
        <form
          action={(inCart ? removeFromCartAction : addToCartAction).bind(null, listing.id)}
          className={styles.cartForm}
        >
          <button
            type="submit"
            className={`${styles.cartBtn} ${inCart ? styles.cartBtnActive : ""}`}
            aria-label={inCart ? "Убрать из корзины" : "Добавить в корзину"}
            title={inCart ? "Убрать из корзины" : "Добавить в корзину"}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
