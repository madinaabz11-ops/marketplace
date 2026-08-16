"use client";

import { useActionState } from "react";
import { resetPasswordAction, type ResetPasswordState } from "@/lib/actions/auth";
import styles from "../app/auth.module.css";

const initialState: ResetPasswordState = {};

export default function ResetPasswordForm({ token }: { token: string }) {
  const action = resetPasswordAction.bind(null, token);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="form-card">
      <p className="eyebrow">Wiskons</p>
      <h1 className={styles.title}>Новый пароль</h1>
      <p className={styles.subtitle}>Придумайте новый пароль для входа</p>

      {state?.error && <p className="form-error">{state.error}</p>}

      <div className="field">
        <label htmlFor="password">Новый пароль</label>
        <input id="password" name="password" type="password" autoComplete="new-password" required minLength={6} />
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Повторите пароль</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
        />
      </div>

      <button type="submit" className="btn btn--primary btn--block" disabled={pending}>
        {pending ? "Сохраняем..." : "Сохранить пароль"}
      </button>
    </form>
  );
}
