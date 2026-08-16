"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { getSession } from "@/lib/session";

export type AuthState = { error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registerAction(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const city = String(formData.get("city") || "").trim();

  if (!name) return { error: "Введите имя" };
  if (!EMAIL_RE.test(email)) return { error: "Введите корректный email" };
  if (password.length < 6) return { error: "Пароль должен быть не короче 6 символов" };
  if (password !== confirmPassword) return { error: "Пароли не совпадают" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Пользователь с таким email уже зарегистрирован" };

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, city: city || null },
  });

  const session = await getSession();
  session.userId = user.id;
  await session.save();

  redirect("/account");
}

export async function loginAction(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) return { error: "Заполните email и пароль" };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "Неверный email или пароль" };

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return { error: "Неверный email или пароль" };

  const session = await getSession();
  session.userId = user.id;
  await session.save();

  redirect("/account");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
