import Link from "next/link";
import styles from "./Footer.module.css";

type User = {
  id: string;
  name: string;
} | null;

export default function Footer({ user }: { user: User }) {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Wiskons</span>
          <span className={styles.brandSub}>маркетплейс товаров</span>
        </div>

        <nav className={styles.nav} aria-label="Навигация в подвале">
          <Link href="/">Все объявления</Link>
          {user ? (
            <Link href="/account">Личный кабинет</Link>
          ) : (
            <>
              <Link href="/register">Регистрация</Link>
              <Link href="/login">Вход</Link>
            </>
          )}
        </nav>

        <p className={styles.copy}>© 2026 Wiskons. Маркетплейс товаров с человеческим лицом.</p>
      </div>
    </footer>
  );
}
