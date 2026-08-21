import type { CATEGORIES } from "./constants";

type Category = (typeof CATEGORIES)[number];

const ICON_PATHS: Record<Category, React.ReactNode> = {
  "Электроника": (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.3 18h3.4" strokeLinecap="round" />
    </>
  ),
  "Одежда и обувь": (
    <>
      <path d="M9 3H7.2L4 6l2 2.4V21h12V8.4L20 6l-3.2-3H15" strokeLinejoin="round" />
      <path d="M9 3a3 3 0 0 0 6 0" />
    </>
  ),
  "Мебель": (
    <>
      <path d="M5 11V6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V11" />
      <path d="M4 11h16v5H4z" strokeLinejoin="round" />
      <path d="M5 16v4M19 16v4" strokeLinecap="round" />
    </>
  ),
  "Книги": (
    <>
      <path d="M4 4.5h6.5v16H4z" strokeLinejoin="round" />
      <path d="M13.5 4.5H20v16h-6.5z" strokeLinejoin="round" />
    </>
  ),
  "Спорт и отдых": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M4 12h16M12 3.5c2.6 2.8 2.6 14.2 0 17M12 3.5c-2.6 2.8-2.6 14.2 0 17" />
    </>
  ),
  "Детские товары": (
    <>
      <rect x="3.5" y="12.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="12.5" width="7" height="7" rx="1" />
      <rect x="8.5" y="4.5" width="7" height="7" rx="1" />
    </>
  ),
  "Дом и сад": (
    <>
      <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10.5V20h12v-9.5" strokeLinejoin="round" />
      <path d="M9.5 20v-5.5h5V20" strokeLinejoin="round" />
    </>
  ),
  "Хобби и творчество": (
    <>
      <path d="M12 4a8 8 0 1 0 3.5 15.2c1.1-.5.7-1.7-.2-2.1-.9-.4-1.1-1.6-.1-2.1.6-.3 1.3-.3 2-.3a3.6 3.6 0 0 0 3.6-3.6C20.8 6.9 16.9 4 12 4Z" />
      <circle cx="8.3" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.7" cy="15.3" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.3" cy="8.3" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  "Другое": (
    <>
      <circle cx="5.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
};

export function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICON_PATHS[category]}
    </svg>
  );
}

export function AllCategoriesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </svg>
  );
}
