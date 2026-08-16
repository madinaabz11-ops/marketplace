import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateListingAction } from "@/lib/actions/listings";
import ListingForm from "@/components/ListingForm";
import styles from "../../new/page.module.css";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing || listing.sellerId !== user.id) notFound();

  const boundAction = updateListingAction.bind(null, id);

  return (
    <section className={`wrap ${styles.page}`}>
      <p className="eyebrow">Редактирование</p>
      <h1 className={`h1 ${styles.title}`}>{listing.title}</h1>
      <ListingForm action={boundAction} initial={listing} submitLabel="Сохранить" />
    </section>
  );
}
