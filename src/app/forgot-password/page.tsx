"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPasswordAction, type ForgotPasswordState } from "@/lib/actions/auth";
import styles from "../auth.module.css";

const initialState: ForgotPasswordState = {};

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, initialState);

  return (
    <div className={styles.page}>
      <form action={formAction} className="form-card">
        <p className="eyebrow">Wiskons</p>
        <h1 className={styles.title}>Забыли пароль</h1>

        {state?.sent ? (
          <p className={styles.note}>
            Если такой email зарегистрирован, мы отправили на него ссылку для восстановления пароля.
            Проверьте почту (и папку «Спам»).
          </p>
        ) : (
          <>
            <p className={styles.subtitle}>Укажите email, мы пришлём ссылку для сброса пароля</p>

            {state?.error && <p className="form-error">{state.error}</p>}

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>

            <button type="submit" className="btn btn--primary btn--block" disabled={pending}>
              {pending ? "Отправляем..." : "Отправить ссылку"}
            </button>
          </>
        )}

        <p className={styles.switch}>
          <Link href="/login" className="link">
            Вернуться ко входу
          </Link>
        </p>
      </form>
    </div>
  );
}
