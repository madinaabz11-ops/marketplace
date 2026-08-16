"use server";

import { randomBytes } from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { sendPasswordResetEmail } from "@/lib/email";

export type AuthState = { error?: string };
export type ForgotPasswordState = { error?: string; sent?: boolean };
export type ResetPasswordState = { error?: string };

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

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

export async function forgotPasswordAction(
  _prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Введите корректный email" };

  const user = await prisma.user.findUnique({ where: { email } });

  // Always report success even if the user doesn't exist, so the form can't be used to check registered emails.
  if (!user) return { sent: true };

  const token = randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
  });

  const host = (await headers()).get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const resetUrl = `${protocol}://${host}/reset-password/${token}`;

  try {
    await sendPasswordResetEmail(user.email, user.name, resetUrl);
  } catch {
    return { error: "Не удалось отправить письмо. Попробуйте ещё раз позже." };
  }

  return { sent: true };
}

export async function resetPasswordAction(
  token: string,
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (password.length < 6) return { error: "Пароль должен быть не короче 6 символов" };
  if (password !== confirmPassword) return { error: "Пароли не совпадают" };

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return { error: "Ссылка недействительна или истекла. Запросите новую." };
  }

  const passwordHash = await hashPassword(password);
  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.deleteMany({ where: { userId: resetToken.userId } }),
  ]);

  redirect("/login");
}
