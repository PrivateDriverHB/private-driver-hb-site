import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

/**
 * Send transactional email with Resend
 * 
 * @param to      string | string[]
 * @param subject string
 * @param html    string
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  try {
    const data = await resend.emails.send({
      from: `Private Driver HB <${fromEmail}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email envoyé :", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Erreur SendEmail:", error);
    return { success: false, error };
  }
}
