"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({ top: rect.bottom + 6, left: rect.left, width: rect.width });
  }, [open]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (wrapRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onScrollOrResize() {
      setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const label = value || placeholder || allLabel;

  const panel = open && (
    <ul
      ref={panelRef}
      className={`${styles.panel} ${styles.panelFixed}`}
      style={{ top: coords.top, left: coords.left, width: Math.max(coords.width, 210) }}
      role="listbox"
      aria-label={ariaLabel}
    >
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
  );

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${styles[variant]}`}>
      <input type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
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

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
