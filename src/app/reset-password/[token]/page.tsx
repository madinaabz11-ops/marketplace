import { prisma } from "@/lib/prisma";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import styles from "../../auth.module.css";

export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
  const isValid = Boolean(resetToken && resetToken.expiresAt > new Date());

  if (!isValid) {
    return (
      <div className={styles.page}>
        <div className="form-card">
          <p className="eyebrow">Wiskons</p>
          <h1 className={styles.title}>Ссылка недействительна</h1>
          <p className={styles.note}>
            Эта ссылка для сброса пароля истекла или уже была использована. Запросите новую на странице{" "}
            <a href="/forgot-password" className="link">
              восстановления пароля
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <ResetPasswordForm token={token} />
    </div>
  );
}
