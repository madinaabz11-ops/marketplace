import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

const priceFormatter = new Intl.NumberFormat("ru-KZ");
const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order || order.buyerId !== user.id) notFound();

  return (
    <section className={`wrap ${styles.page}`}>
      <p className="eyebrow">Заказ оформлен</p>
      <h1 className={`h1 ${styles.title}`}>Спасибо за заказ!</h1>
      <p className={styles.meta}>
        Заказ №{order.id.slice(-8)} от {dateFormatter.format(order.createdAt)}
      </p>

      <ul className={styles.list}>
        {order.items.map((item) => (
          <li key={item.id} className={styles.row}>
            <span>
              {item.title}
              {item.quantity > 1 && ` × ${item.quantity}`}
            </span>
            <span>{priceFormatter.format(item.price * item.quantity)} ₸</span>
          </li>
        ))}
      </ul>

      <p className={styles.total}>
        Итого: <strong>{priceFormatter.format(order.totalPrice)} ₸</strong>
      </p>

      <div className={styles.details}>
        <p className={styles.detailsLabel}>Доставка</p>
        <p>{order.address}</p>
        <p>{order.phone}</p>
      </div>

      <p className={styles.note}>
        Оплата наличными или переводом при получении - продавец свяжется с вами, чтобы согласовать детали.
      </p>

      <Link href="/" className="btn btn--primary">
        Продолжить покупки
      </Link>
    </section>
  );
}
