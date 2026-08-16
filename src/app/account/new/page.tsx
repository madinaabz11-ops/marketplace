import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createListingAction } from "@/lib/actions/listings";
import ListingForm from "@/components/ListingForm";
import styles from "./page.module.css";

export default async function NewListingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <section className={`wrap ${styles.page}`}>
      <p className="eyebrow">Новое объявление</p>
      <h1 className={`h1 ${styles.title}`}>Что продаём?</h1>
      <ListingForm action={createListingAction} submitLabel="Опубликовать" />
    </section>
  );
}
