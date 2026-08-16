"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type AuthState } from "@/lib/actions/auth";
import styles from "../auth.module.css";

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className={styles.page}>
      <form action={formAction} className="form-card">
        <p className="eyebrow">Wiskons</p>
        <h1 className={styles.title}>С возвращением</h1>
        <p className={styles.subtitle}>Войдите, чтобы продолжить</p>

        {state?.error && <p className="form-error">{state.error}</p>}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="field">
          <label htmlFor="password">Пароль</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>

        <button type="submit" className="btn btn--primary btn--block" disabled={pending}>
          {pending ? "Входим..." : "Войти"}
        </button>

        <p className={styles.switch}>
          Ещё нет аккаунта? <Link href="/register" className="link">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
}
