import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string) {
  const { error } = await resend.emails.send({
    from: "Wiskons <onboarding@resend.dev>",
    to,
    subject: "Восстановление пароля - Wiskons",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #101614;">
        <h2 style="margin: 0 0 16px;">Здравствуйте, ${name}!</h2>
        <p>Вы запросили восстановление пароля на Wiskons. Ссылка действительна 1 час.</p>
        <p style="margin: 24px 0;">
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #a3c451; color: #10120a; text-decoration: none; font-weight: 600;">
            Сбросить пароль
          </a>
        </p>
        <p style="color: #6b6b6b; font-size: 13px;">Если это были не вы, просто проигнорируйте это письмо - пароль останется прежним.</p>
      </div>
    `,
  });

  if (error) throw new Error(error.message);
}
