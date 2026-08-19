"use client";

import { useActionState } from "react";
import { createOrderAction } from "@/lib/actions/orders";
import styles from "./CheckoutForm.module.css";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(createOrderAction, {});

  return (
    <form action={formAction} className={`form-card ${styles.form}`}>
      {state?.error && <p className="form-error">{state.error}</p>}

      <div className="field">
        <label htmlFor="phone">Телефон</label>
        <input id="phone" name="phone" type="tel" placeholder="+7 700 123 45 67" required />
      </div>

      <div className="field">
        <label htmlFor="address">Адрес доставки</label>
        <textarea id="address" name="address" placeholder="Город, улица, дом, квартира" required minLength={5} />
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
