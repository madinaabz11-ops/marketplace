"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./Header.module.css";

type User = {
  id: string;
  name: string;
} | null;

export default function Header({ user, cartCount = 0 }: { user: User; cartCount?: number }) {
  const pathname = usePathname();
  const menuToggleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (menuToggleRef.current) menuToggleRef.current.checked = false;
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M6 14 16 5l10 9v13H6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M12 27v-8h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Wiskons</span>
            <span className={styles.brandSub}>маркетплейс товаров</span>
          </span>
        </Link>

        <input type="checkbox" id="menu-toggle" ref={menuToggleRef} className={styles.menuToggle} />
        <label htmlFor="menu-toggle" className={styles.burger} aria-label="Открыть меню">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <nav className={styles.nav} aria-label="Основная навигация">
          <Link href="/#listings">Все объявления</Link>
          {user ? (
            <>
              <Link href="/account/new" className={styles.postLink}>
                + Разместить
              </Link>
              <Link href="/cart" className={styles.cartLink} aria-label="Корзина">
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
                {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
              </Link>
              <Link href="/account" className={styles.accountLink}>
                {user.name}
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">Войти</Link>
              <Link href="/register" className="btn btn--primary btn--sm">
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
