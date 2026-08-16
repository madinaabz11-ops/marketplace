"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function addToCartAction(listingId: string) {
  const user = await requireUser();
  const listing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!listing || listing.status !== "active" || listing.sellerId === user.id) return;

  await prisma.cartItem.upsert({
    where: { userId_listingId: { userId: user.id, listingId } },
    update: {},
    create: { userId: user.id, listingId },
  });

  revalidatePath("/");
  revalidatePath("/cart");
  revalidatePath(`/listing/${listingId}`);
}

export async function removeFromCartAction(listingId: string) {
  const user = await requireUser();
  await prisma.cartItem.deleteMany({ where: { userId: user.id, listingId } });

  revalidatePath("/");
  revalidatePath("/cart");
  revalidatePath(`/listing/${listingId}`);
}
