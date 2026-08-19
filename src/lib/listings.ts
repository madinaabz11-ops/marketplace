import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export type ListingSort = "new" | "old" | "price_asc" | "price_desc";

export type ListingFilters = {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: ListingSort;
};

const SORT_ORDER_BY: Record<ListingSort, Prisma.ListingOrderByWithRelationInput> = {
  new: { createdAt: "desc" },
  old: { createdAt: "asc" },
  price_asc: { price: "asc" },
  price_desc: { price: "desc" },
};

// SQLite's LIKE (what Prisma's `contains` compiles to) only case-folds ASCII,
// so a Cyrillic text search is filtered here in JS instead, after narrowing
// the set down with the DB for everything else.
export function buildListingWhere(filters: ListingFilters): Prisma.ListingWhereInput {
  const where: Prisma.ListingWhereInput = { status: "active" };

  if (filters.category) where.category = filters.category;

  const min = filters.minPrice ? Number(filters.minPrice) : undefined;
  const max = filters.maxPrice ? Number(filters.maxPrice) : undefined;
  if (min !== undefined && !Number.isNaN(min)) {
    where.price = { ...(where.price as object), gte: min };
  }
  if (max !== undefined && !Number.isNaN(max)) {
    where.price = { ...(where.price as object), lte: max };
  }

  return where;
}

export async function getListings(filters: ListingFilters) {
  const listings = await prisma.listing.findMany({
    where: buildListingWhere(filters),
    orderBy: SORT_ORDER_BY[filters.sort ?? "new"],
    include: { seller: { select: { name: true } } },
  });

  if (!filters.q) return listings;

  const q = filters.q.toLocaleLowerCase("ru");
  return listings.filter(
    (l) =>
      l.title.toLocaleLowerCase("ru").includes(q) ||
      l.description.toLocaleLowerCase("ru").includes(q)
  );
}
