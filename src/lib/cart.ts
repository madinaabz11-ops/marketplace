import { prisma } from "./prisma";

export async function getCartItems(userId: string) {
  return prisma.cartItem.findMany({
    where: { userId },
    include: { listing: { include: { seller: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCartListingIds(userId: string | undefined) {
  if (!userId) return new Set<string>();
  const items = await prisma.cartItem.findMany({ where: { userId }, select: { listingId: true } });
  return new Set(items.map((item) => item.listingId));
}

export async function getCartCount(userId: string | undefined) {
  if (!userId) return 0;
  return prisma.cartItem.count({ where: { userId } });
}
