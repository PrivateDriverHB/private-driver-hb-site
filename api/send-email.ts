import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log("🟢 API /send-email appelée"); // 👈 ajoute cette ligne

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, message } = req.body;

  try {
    console.log("📨 Tentative d’envoi avec :", { to, subject });
    
    const data = await resend.emails.send({
      from: 'contact@privatedriverhb.com',
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    console.log("✅ Envoi réussi :", data);
    res.status(200).json({ success: true, data });
 } catch (error) {
  console.error("❌ Erreur pendant l’envoi :", error);
  res.status(500).json({ success: false, error: error.message });
}

}

