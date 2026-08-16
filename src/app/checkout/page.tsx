import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCartItems } from "@/lib/cart";
import CheckoutForm from "@/components/CheckoutForm";
import styles from "./page.module.css";

const priceFormatter = new Intl.NumberFormat("ru-KZ");

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const items = await getCartItems(user.id);
  if (items.length === 0) redirect("/cart");

  const total = items.reduce((sum, item) => sum + item.listing.price, 0);

  return (
    <section className={`wrap ${styles.page}`}>
      <p className="eyebrow">Оформление заказа</p>
      <h1 className={`h1 ${styles.title}`}>Оформление заказа</h1>

      <div className={styles.layout}>
        <CheckoutForm defaultCity={user.city} />

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Ваш заказ</h2>
          <ul className={styles.summaryList}>
            {items.map((item) => (
              <li key={item.id} className={styles.summaryRow}>
                <span>{item.listing.title}</span>
                <span>{priceFormatter.format(item.listing.price)} ₸</span>
              </li>
            ))}
          </ul>
          <p className={styles.summaryTotal}>
            <span>Итого</span>
            <span>{priceFormatter.format(total)} ₸</span>
          </p>
        </aside>
      </div>
    </section>
  );
}
