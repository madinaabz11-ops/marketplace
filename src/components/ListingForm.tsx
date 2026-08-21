"use client";

import { useActionState } from "react";
import { CATEGORIES, CATEGORY_ICONS } from "@/lib/constants";
import type { ListingState } from "@/lib/actions/listings";
import styles from "./ListingForm.module.css";

type Action = (prevState: ListingState, formData: FormData) => Promise<ListingState>;

type InitialValues = {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  imageUrl?: string | null;
};

export default function ListingForm({
  action,
  initial,
  submitLabel,
}: {
  action: Action;
  initial?: InitialValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {} as ListingState);

  return (
    <form action={formAction} className={styles.form}>
      {state?.error && <p className="form-error">{state.error}</p>}

      <div className="field">
        <label htmlFor="title">Название</label>
        <input id="title" name="title" type="text" defaultValue={initial?.title} required minLength={3} />
      </div>

      <div className="field">
        <label htmlFor="description">Описание</label>
        <textarea id="description" name="description" defaultValue={initial?.description} required minLength={10} />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="price">Цена, ₸</label>
          <input id="price" name="price" type="number" min={1} defaultValue={initial?.price} required />
        </div>
        <div className="field">
          <label htmlFor="category">Категория</label>
          <select id="category" name="category" defaultValue={initial?.category ?? ""} required>
            <option value="" disabled>
              Выберите категорию
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_ICONS[c]} {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="image">Фото {initial?.imageUrl ? "(необязательно - заменит текущее)" : ""}</label>
        {initial?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={initial.imageUrl} alt="" className={styles.currentImage} />
        )}
        <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" />
      </div>

      <button type="submit" className="btn btn--primary" disabled={pending}>
        {pending ? "Сохраняем..." : submitLabel}
      </button>
    </form>
  );
}
