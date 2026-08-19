"use server";

import { randomUUID } from "crypto";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { CATEGORIES } from "@/lib/constants";

export type ListingState = { error?: string };

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

async function saveImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Фото должно быть в формате JPG, PNG или WEBP");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Фото не должно превышать 5 МБ");
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

function readListingFields(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priceRaw = String(formData.get("price") || "");
  const category = String(formData.get("category") || "");
  const price = Number(priceRaw);

  if (!title || title.length < 3) return { error: "Название должно быть не короче 3 символов" as const };
  if (!description || description.length < 10) return { error: "Опишите вещь чуть подробнее (от 10 символов)" as const };
  if (!Number.isFinite(price) || price <= 0) return { error: "Укажите цену больше нуля" as const };
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) return { error: "Выберите категорию" as const };

  return { title, description, price: Math.round(price), category };
}

export async function createListingAction(_prevState: ListingState, formData: FormData): Promise<ListingState> {
  const user = await requireUser();
  const fields = readListingFields(formData);
  if ("error" in fields) return { error: fields.error };

  let imageUrl: string | null;
  try {
    imageUrl = await saveImage(formData.get("image") as File | null);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Не удалось сохранить фото" };
  }

  const listing = await prisma.listing.create({
    data: { ...fields, imageUrl, sellerId: user.id },
  });

  revalidatePath("/");
  redirect(`/listing/${listing.id}`);
}

export async function updateListingAction(
  id: string,
  _prevState: ListingState,
  formData: FormData
): Promise<ListingState> {
  const user = await requireUser();
  const existing = await prisma.listing.findUnique({ where: { id } });
  if (!existing || existing.sellerId !== user.id) return { error: "Объявление не найдено" };

  const fields = readListingFields(formData);
  if ("error" in fields) return { error: fields.error };

  let imageUrl = existing.imageUrl;
  try {
    const newImage = await saveImage(formData.get("image") as File | null);
    if (newImage) {
      imageUrl = newImage;
      if (existing.imageUrl) {
        await unlink(path.join(process.cwd(), "public", existing.imageUrl)).catch(() => {});
      }
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Не удалось сохранить фото" };
  }

  await prisma.listing.update({ where: { id }, data: { ...fields, imageUrl } });

  revalidatePath("/");
  revalidatePath(`/listing/${id}`);
  redirect(`/listing/${id}`);
}

export async function deleteListingAction(id: string) {
  const user = await requireUser();
  const existing = await prisma.listing.findUnique({ where: { id } });
  if (!existing || existing.sellerId !== user.id) return;

  if (existing.imageUrl) {
    await unlink(path.join(process.cwd(), "public", existing.imageUrl)).catch(() => {});
  }
  await prisma.listing.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/account");
  redirect("/account");
}

export async function toggleSoldAction(id: string) {
  const user = await requireUser();
  const existing = await prisma.listing.findUnique({ where: { id } });
  if (!existing || existing.sellerId !== user.id) return;

  await prisma.listing.update({
    where: { id },
    data: { status: existing.status === "active" ? "sold" : "active" },
  });

  revalidatePath("/");
  revalidatePath("/account");
  revalidatePath(`/listing/${id}`);
}
