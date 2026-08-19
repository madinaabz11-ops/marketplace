import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { deleteListingAction, toggleSoldAction } from "@/lib/actions/listings";
import { addToCartAction, removeFromCartAction } from "@/lib/actions/cart";
import styles from "./page.module.css";

const priceFormatter = new Intl.NumberFormat("ru-KZ");
const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

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

  const cartItem = user && !isOwner
    ? await prisma.cartItem.findUnique({
        where: { userId_listingId: { userId: user.id, listingId: listing.id } },
      })
    : null;
  const inCart = Boolean(cartItem);

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
            <div className={styles.contactNote}>Этот товар уже продан.</div>
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
    </section>
  );
}
