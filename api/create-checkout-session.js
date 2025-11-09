import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const {
      customerEmail,
      customerName,
      pickup,
      dropoff,
      date,
      time,
      price,
      phone,
    } = req.body;

    // ✅ Création session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Course VTC — Private Driver HB`,
              description: `${pickup} → ${dropoff}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.VITE_SERVER_URL}/success`,
      cancel_url: `${process.env.VITE_SERVER_URL}/cancel`,
    });

    // ✅ Envoi email
    await fetch(`${process.env.VITE_SERVER_URL}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerEmail,
        customerName,
        pickup,
        dropoff,
        date,
        time,
        price,
        phone,
      }),
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
