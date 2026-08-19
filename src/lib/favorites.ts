import { prisma } from "./prisma";

export async function getFavoriteListings(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: { listing: { include: { seller: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getFavoriteListingIds(userId: string | undefined) {
  if (!userId) return new Set<string>();
  const items = await prisma.favorite.findMany({ where: { userId }, select: { listingId: true } });
  return new Set(items.map((item) => item.listingId));
}

export async function getFavoritesCount(userId: string | undefined) {
  if (!userId) return 0;
  return prisma.favorite.count({ where: { userId } });
}
