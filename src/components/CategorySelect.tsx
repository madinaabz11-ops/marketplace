"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { CategoryIcon, AllCategoriesIcon } from "@/lib/categoryIcons";
import styles from "./CategorySelect.module.css";

type Category = (typeof CATEGORIES)[number];

export default function CategorySelect({
  id,
  name = "category",
  defaultValue = "",
  variant = "standalone",
  allLabel = "Все категории",
  placeholder,
  hideAllOption = false,
  ariaLabel = "Категория",
}: {
  id?: string;
  name?: string;
  defaultValue?: string;
  variant?: "standalone" | "header" | "field";
  allLabel?: string;
  placeholder?: string;
  hideAllOption?: boolean;
  ariaLabel?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const label = value || placeholder || allLabel;

  return (
    <div ref={rootRef} className={`${styles.wrap} ${styles[variant]}`}>
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.triggerIcon}>
          {value ? <CategoryIcon category={value as Category} /> : <AllCategoriesIcon />}
        </span>
        <span className={value ? styles.triggerLabel : `${styles.triggerLabel} ${styles.triggerPlaceholder}`}>
          {label}
        </span>
        <svg className={styles.chevron} viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className={styles.panel} role="listbox" aria-label={ariaLabel}>
          {!hideAllOption && (
            <li role="option" aria-selected={value === ""}>
              <button
                type="button"
                className={value === "" ? `${styles.option} ${styles.optionActive}` : styles.option}
                onClick={() => {
                  setValue("");
                  setOpen(false);
                }}
              >
                <AllCategoriesIcon className={styles.optionIcon} />
                {allLabel}
              </button>
            </li>
          )}
          {CATEGORIES.map((c) => (
            <li key={c} role="option" aria-selected={value === c}>
              <button
                type="button"
                className={value === c ? `${styles.option} ${styles.optionActive}` : styles.option}
                onClick={() => {
                  setValue(c);
                  setOpen(false);
                }}
              >
                <CategoryIcon category={c} className={styles.optionIcon} />
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
