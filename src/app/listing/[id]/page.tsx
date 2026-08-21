import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { deleteListingAction, toggleSoldAction } from "@/lib/actions/listings";
import { addToCartAction, removeFromCartAction } from "@/lib/actions/cart";
import { addToFavoritesAction, removeFromFavoritesAction } from "@/lib/actions/favorites";
import { getCartListingIds } from "@/lib/cart";
import { getFavoriteListingIds } from "@/lib/favorites";
import ListingCard from "@/components/ListingCard";
import styles from "./page.module.css";

const priceFormatter = new Intl.NumberFormat("ru-KZ");
const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

function FavoriteIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-9.8-9.3C.7 7.9 2.2 4.5 5.6 3.7c2-.5 4 .3 5.2 2.1a.9.9 0 0 0 1.4 0c1.2-1.8 3.2-2.6 5.2-2.1 3.4.8 4.9 4.2 3.4 7.5-2.3 4.7-9.8 9.3-9.8 9.3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [listing, user] = await Promise.all([
    prisma.listing.findUnique({
      where: { id },
      include: { seller: { select: { id: true, name: true, createdAt: true } } },
    }),
    getCurrentUser(),
  ]);

  if (!listing) notFound();

  const isOwner = user?.id === listing.sellerId;

  const [cartItem, favorite] = user && !isOwner
    ? await Promise.all([
        prisma.cartItem.findUnique({
          where: { userId_listingId: { userId: user.id, listingId: listing.id } },
        }),
        prisma.favorite.findUnique({
          where: { userId_listingId: { userId: user.id, listingId: listing.id } },
        }),
      ])
    : [null, null];
  const inCart = Boolean(cartItem);
  const isFavorite = Boolean(favorite);

  const [similarListings, cartListingIds, favoriteListingIds] = await Promise.all([
    prisma.listing.findMany({
      where: { category: listing.category, status: "active", id: { not: listing.id } },
      include: { seller: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    getCartListingIds(user?.id),
    getFavoriteListingIds(user?.id),
  ]);

  return (
    <section className="wrap">
      <div className={styles.layout}>
        <div className={`${styles.imageWrap} fade-in-up`}>
          {listing.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={listing.imageUrl} alt={listing.title} className={styles.image} />
          ) : (
            <div className={styles.placeholder} aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <path d="M12 24 32 12l20 12v24H12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M24 48V32h16v16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          {listing.status === "sold" && <span className={styles.soldBadge}>Продано</span>}
        </div>

        <div className={`${styles.info} fade-in-up`} style={{ animationDelay: "0.1s" }}>
          <div className={styles.tags}>
            <span className={styles.tag}>{listing.category}</span>
          </div>

          <h1 className={styles.title}>{listing.title}</h1>
          <p className={styles.price}>{priceFormatter.format(listing.price)} ₸</p>

          <p className={styles.description}>{listing.description}</p>

          <div className={styles.seller}>
            <p className={styles.sellerLabel}>Продавец</p>
            <p className={styles.sellerName}>{listing.seller.name}</p>
            <p className={styles.sellerMeta}>
              на Wiskons с {dateFormatter.format(listing.seller.createdAt)}
            </p>
          </div>

          {isOwner ? (
            <div className={styles.ownerActions}>
              <a href={`/account/edit/${listing.id}`} className="btn btn--secondary">
                Редактировать
              </a>
              <form action={toggleSoldAction.bind(null, listing.id)}>
                <button type="submit" className="btn btn--ghost">
                  {listing.status === "active" ? "Отметить проданным" : "Вернуть в продажу"}
                </button>
              </form>
              <form action={deleteListingAction.bind(null, listing.id)}>
                <button type="submit" className={`btn btn--ghost ${styles.deleteBtn}`}>
                  Удалить
                </button>
              </form>
            </div>
          ) : listing.status === "sold" ? (
            <>
              <div className={styles.buyerActions}>
                <form action={(isFavorite ? removeFromFavoritesAction : addToFavoritesAction).bind(null, listing.id)}>
                  <button
                    type="submit"
                    className={`btn btn--ghost ${styles.favBtn} ${isFavorite ? styles.favBtnActive : ""}`}
                  >
                    <FavoriteIcon filled={isFavorite} />
                    {isFavorite ? "В избранном" : "В избранное"}
                  </button>
                </form>
              </div>
              <div className={styles.contactNote}>Этот товар уже продан.</div>
            </>
          ) : user ? (
            <>
              <div className={styles.buyerActions}>
                <form action={(inCart ? removeFromCartAction : addToCartAction).bind(null, listing.id)}>
                  <button type="submit" className={inCart ? "btn btn--secondary" : "btn btn--primary"}>
                    {inCart ? "Убрать из корзины" : "В корзину"}
                  </button>
                </form>
                {inCart && (
                  <Link href="/cart" className="btn btn--ghost">
                    Перейти в корзину
                  </Link>
                )}
                <form action={(isFavorite ? removeFromFavoritesAction : addToFavoritesAction).bind(null, listing.id)}>
                  <button
                    type="submit"
                    className={`btn btn--ghost ${styles.favBtn} ${isFavorite ? styles.favBtnActive : ""}`}
                  >
                    <FavoriteIcon filled={isFavorite} />
                    {isFavorite ? "В избранном" : "В избранное"}
                  </button>
                </form>
              </div>
              <div className={styles.contactNote}>
                Чтобы связаться с продавцом, посмотрите его профиль - раздел с сообщениями пока в разработке.
              </div>
            </>
          ) : (
            <div className={styles.contactNote}>
              <Link href="/login" className="link">
                Войдите
              </Link>
              , чтобы добавить товар в корзину или связаться с продавцом.
            </div>
          )}
        </div>
      </div>

      {similarListings.length > 0 && (
        <div className={styles.similar}>
          <h2 className="h2">Похожие товары</h2>
          <div className={styles.similarGrid}>
            {similarListings.map((item) => (
              <ListingCard
                key={item.id}
                listing={item}
                currentUserId={user?.id}
                inCart={cartListingIds.has(item.id)}
                isFavorite={favoriteListingIds.has(item.id)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
