import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCartItems } from "@/lib/cart";
import { removeFromCartAction } from "@/lib/actions/cart";
import styles from "./page.module.css";

const priceFormatter = new Intl.NumberFormat("ru-KZ");

export default async function CartPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const items = await getCartItems(user.id);
  const total = items.reduce((sum, item) => sum + item.listing.price, 0);

  return (
    <section className={`wrap ${styles.page}`}>
      <p className="eyebrow">Корзина</p>
      <h1 className={`h1 ${styles.title}`}>Ваша корзина</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>
          Корзина пуста.{" "}
          <Link href="/" className="link">
            Посмотреть объявления
          </Link>
        </p>
      ) : (
        <>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.row}>
                <Link href={`/listing/${item.listing.id}`} className={styles.itemLink}>
                  <div className={styles.imageWrap}>
                    {item.listing.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.listing.imageUrl} alt={item.listing.title} className={styles.image} />
                    ) : (
                      <div className={styles.placeholder} aria-hidden="true">
                        <svg viewBox="0 0 64 64" fill="none">
                          <path
                            d="M12 24 32 12l20 12v24H12z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                          <path d="M24 48V32h16v16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.listing.title}</p>
                    <p className={styles.itemSeller}>
                      {item.listing.seller.name} · {item.listing.city}
                    </p>
                  </div>
                </Link>

                <p className={styles.itemPrice}>{priceFormatter.format(item.listing.price)} ₸</p>

                <form action={removeFromCartAction.bind(null, item.listing.id)}>
                  <button type="submit" className="btn btn--ghost btn--sm">
                    Убрать
                  </button>
                </form>
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <p className={styles.total}>
              Итого: <strong>{priceFormatter.format(total)} ₸</strong>
            </p>
            <Link href="/checkout" className="btn btn--primary">
              Оформить заказ
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
