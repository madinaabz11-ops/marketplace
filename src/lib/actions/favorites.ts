"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function addToFavoritesAction(listingId: string) {
  const user = await requireUser();

  await prisma.favorite.upsert({
    where: { userId_listingId: { userId: user.id, listingId } },
    update: {},
    create: { userId: user.id, listingId },
  });

  revalidatePath("/");
  revalidatePath("/favorites");
  revalidatePath(`/listing/${listingId}`);
}

export async function removeFromFavoritesAction(listingId: string) {
  const user = await requireUser();
  await prisma.favorite.deleteMany({ where: { userId: user.id, listingId } });

  revalidatePath("/");
  revalidatePath("/favorites");
  revalidatePath(`/listing/${listingId}`);
}
