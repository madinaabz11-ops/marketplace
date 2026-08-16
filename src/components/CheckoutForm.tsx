"use client";

import { useActionState } from "react";
import { createOrderAction } from "@/lib/actions/orders";
import { CITIES } from "@/lib/constants";
import styles from "./CheckoutForm.module.css";

export default function CheckoutForm({ defaultCity }: { defaultCity?: string | null }) {
  const [state, formAction, pending] = useActionState(createOrderAction, {});

  return (
    <form action={formAction} className={`form-card ${styles.form}`}>
      {state?.error && <p className="form-error">{state.error}</p>}

      <div className="field">
        <label htmlFor="phone">Телефон</label>
        <input id="phone" name="phone" type="tel" placeholder="+7 700 123 45 67" required />
      </div>

      <div className="field">
        <label htmlFor="city">Город доставки</label>
        <select id="city" name="city" defaultValue={defaultCity ?? ""} required>
          <option value="" disabled>
            Выберите город
          </option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="address">Адрес</label>
        <textarea id="address" name="address" placeholder="Улица, дом, квартира" required minLength={5} />
      </div>

      <p className={styles.note}>
        Оплата наличными или переводом при получении - продавец свяжется с вами, чтобы согласовать детали.
      </p>

      <button type="submit" className="btn btn--primary btn--block" disabled={pending}>
        {pending ? "Оформляем..." : "Подтвердить заказ"}
      </button>
    </form>
  );
}
