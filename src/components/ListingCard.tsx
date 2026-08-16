import Link from "next/link";
import { addToCartAction, removeFromCartAction } from "@/lib/actions/cart";
import styles from "./ListingCard.module.css";

export type ListingCardData = {
  id: string;
  title: string;
  price: number;
  category: string;
  city: string;
  imageUrl: string | null;
  sellerId: string;
  status: string;
};

const priceFormatter = new Intl.NumberFormat("ru-KZ");

export default function ListingCard({
  listing,
  currentUserId,
  inCart,
}: {
  listing: ListingCardData;
  currentUserId?: string;
  inCart?: boolean;
}) {
  const canAddToCart = Boolean(currentUserId) && currentUserId !== listing.sellerId && listing.status === "active";

  return (
    <div className={styles.card}>
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
          <p className={styles.city}>{listing.city}</p>
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
