import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/lib/actions/auth";
import ListingCard from "@/components/ListingCard";
import styles from "./page.module.css";

const priceFormatter = new Intl.NumberFormat("ru-KZ");
const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [listings, orders] = await Promise.all([
    prisma.listing.findMany({
      where: { sellerId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.findMany({
      where: { buyerId: user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const active = listings.filter((l) => l.status === "active");
  const sold = listings.filter((l) => l.status === "sold");

  return (
    <section className="wrap">
      <div className={styles.headerRow}>
        <div>
          <p className="eyebrow">Личный кабинет</p>
          <h1 className="h1">{user.name}</h1>
          <p className={styles.meta}>{user.email}</p>
        </div>

        <div className={styles.headerActions}>
          <Link href="/account/new" className="btn btn--primary">
            + Разместить объявление
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="btn btn--ghost">
              Выйти
            </button>
          </form>
        </div>
      </div>

      <h2 className={`h2 ${styles.sectionTitle}`}>Мои объявления ({active.length})</h2>
      {active.length === 0 ? (
        <p className={styles.empty}>Пока пусто. Разместите первое объявление - это займёт пару минут.</p>
      ) : (
        <div className={styles.grid}>
          {active.map((listing) => (
            <ListingCard key={listing.id} listing={listing} currentUserId={user.id} />
          ))}
        </div>
      )}

      {sold.length > 0 && (
        <>
          <h2 className={`h2 ${styles.sectionTitle}`}>Проданные ({sold.length})</h2>
          <div className={styles.grid}>
            {sold.map((listing) => (
              <ListingCard key={listing.id} listing={listing} currentUserId={user.id} />
            ))}
          </div>
        </>
      )}

      <h2 className={`h2 ${styles.sectionTitle}`}>Мои заказы ({orders.length})</h2>
      {orders.length === 0 ? (
        <p className={styles.empty}>Заказов пока нет.</p>
      ) : (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order.id}>
              <Link href={`/orders/${order.id}`} className={styles.orderRow}>
                <span>
                  Заказ от {dateFormatter.format(order.createdAt)} · {order.items.length}{" "}
                  {order.items.length === 1 ? "товар" : "товара"}
                </span>
                <span className={styles.orderPrice}>{priceFormatter.format(order.totalPrice)} ₸</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
