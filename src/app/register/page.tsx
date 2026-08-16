"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type AuthState } from "@/lib/actions/auth";
import { CITIES } from "@/lib/constants";
import styles from "../auth.module.css";

const initialState: AuthState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <div className={styles.page}>
      <form action={formAction} className="form-card">
        <p className="eyebrow">Wiskons</p>
        <h1 className={styles.title}>Создать аккаунт</h1>
        <p className={styles.subtitle}>Регистрация займёт меньше минуты</p>

        {state?.error && <p className="form-error">{state.error}</p>}

        <div className="field">
          <label htmlFor="name">Имя</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="field">
          <label htmlFor="city">Город (необязательно)</label>
          <select id="city" name="city" defaultValue="">
            <option value="">Не выбран</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="password">Пароль</label>
            <input id="password" name="password" type="password" autoComplete="new-password" required />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Повторите пароль</label>
            <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
          </div>
        </div>

        <button type="submit" className="btn btn--primary btn--block" disabled={pending}>
          {pending ? "Создаём..." : "Зарегистрироваться"}
        </button>

        <p className={styles.switch}>
          Уже есть аккаунт? <Link href="/login" className="link">Войти</Link>
        </p>
      </form>
    </div>
  );
}
