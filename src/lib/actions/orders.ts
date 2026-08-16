"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { CITIES } from "@/lib/constants";

export type CheckoutState = { error?: string };

const PHONE_PATTERN = /^[+0-9()\-\s]{6,20}$/;

export async function createOrderAction(_prevState: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const user = await requireUser();

  const phone = String(formData.get("phone") || "").trim();
  const city = String(formData.get("city") || "");
  const address = String(formData.get("address") || "").trim();

  if (!PHONE_PATTERN.test(phone)) return { error: "Укажите корректный номер телефона" };
  if (!CITIES.includes(city as (typeof CITIES)[number])) return { error: "Выберите город доставки" };
  if (!address || address.length < 5) return { error: "Укажите адрес подробнее" };

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: { listing: true },
  });

  const available = cartItems.filter((item) => item.listing.status === "active");
  if (available.length === 0) return { error: "Корзина пуста" };

  const totalPrice = available.reduce((sum, item) => sum + item.listing.price, 0);
  const listingIds = available.map((item) => item.listing.id);

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        buyerId: user.id,
        city,
        address,
        phone,
        totalPrice,
        items: {
          create: available.map((item) => ({
            title: item.listing.title,
            price: item.listing.price,
            listingId: item.listing.id,
          })),
        },
      },
    });

    await tx.listing.updateMany({
      where: { id: { in: listingIds } },
      data: { status: "sold" },
    });

    await tx.cartItem.deleteMany({ where: { userId: user.id } });

    return created;
  });

  revalidatePath("/");
  revalidatePath("/cart");
  revalidatePath("/account");
  redirect(`/orders/${order.id}`);
}
