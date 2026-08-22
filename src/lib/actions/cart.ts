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

export async function increaseCartQuantityAction(listingId: string) {
  const user = await requireUser();
  await prisma.cartItem.updateMany({
    where: { userId: user.id, listingId },
    data: { quantity: { increment: 1 } },
  });

  revalidatePath("/cart");
}

export async function decreaseCartQuantityAction(listingId: string) {
  const user = await requireUser();
  const item = await prisma.cartItem.findUnique({
    where: { userId_listingId: { userId: user.id, listingId } },
  });
  if (!item || item.quantity <= 1) return;

  await prisma.cartItem.update({
    where: { userId_listingId: { userId: user.id, listingId } },
    data: { quantity: { decrement: 1 } },
  });

  revalidatePath("/cart");
}
