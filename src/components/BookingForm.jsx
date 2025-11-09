import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// ✅ arrondi au 0,50 € le plus proche
function roundToHalfEUR(valueEUR) {
  return Math.round(valueEUR * 2) / 2;
}

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: 1,
    hours: 1,
    service: "course",   // course | misedispo
    distanceKm: 0,
    priceCents: 4500,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function compute() {
    try {
      if (form.service === "misedispo") {
        // ✅ Mise à dispo : 50 €/h
        const perHour = 50;
        let total = perHour * Number(form.hours || 1);

        total = roundToHalfEUR(total);
        setForm((f) => ({ ...f, priceCents: Math.round(total * 100) }));
        return;
      }

      // ✅ course : calcul distance GOOGLE
      if (!form.pickup || !form.dropoff) return;

      const GMAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const url =
        "https://maps.googleapis.com/maps/api/distancematrix/json" +
        `?origins=${encodeURIComponent(form.pickup)}` +
        `&destinations=${encodeURIComponent(form.dropoff)}` +
        `&key=${GMAPS_KEY}`;

      const r = await fetch(url);
      const j = await r.json();

      const distMeters = j?.rows?.[0]?.elements?.[0]?.distance?.value ?? 0;
      const distKm = distMeters / 1000;

      const basePickup = 15;
      const perKmEUR = 2;

      let totalEUR = basePickup + perKmEUR * distKm;
      totalEUR = roundToHalfEUR(totalEUR);

      setForm((f) => ({
        ...f,
        distanceKm: distKm,
        priceCents: Math.round(totalEUR * 100),
      }));
    } catch (e) {
      console.error("[Distance error]", e);
    }
  }

  useEffect(() => {
    compute();
  }, [form.service, form.pickup, form.dropoff, form.hours]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        booking: {
          ...form,
          priceCents: form.priceCents ?? Math.round((form.price || 45) * 100),
        },
      };

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert("Erreur : le paiement ne s'est pas initialisé");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl card">

      {/* Type de service */}
      <select
        name="service"
        onChange={handleChange}
        className="border border-white/10 bg-black/40 text-white rounded p-3 mb-4 w-full"
      >
        <option value="course">Course (2€ / km + 15€)</option>
        <option value="misedispo">Mise à dispo (50€/h)</option>
      </select>

      {form.service === "misedispo" ? (
        <input
          type="number"
          name="hours"
          placeholder="Heures"
          min="1"
          onChange={handleChange}
          className="border border-white/10 bg-black/40 text-white rounded p-3 mb-4 w-full"
        />
      ) : null}

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          onChange={handleChange}
          required
          placeholder="Nom"
          className="border border-white/10 bg-black/40 text-white rounded p-3"
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          required
          placeholder="Adresse e-mail"
          className="border border-white/10 bg-black/40 text-white rounded p-3"
        />
        <input
          name="pickup"
          onChange={handleChange}
          required
          placeholder="Départ"
          className="border border-white/10 bg-black/40 text-white rounded p-3"
        />
        <input
          name="dropoff"
          onChange={handleChange}
          required
          placeholder="Destination"
          className="border border-white/10 bg-black/40 text-white rounded p-3"
        />
        <input
          name="date"
          type="date"
          onChange={handleChange}
          required
          className="border border-white/10 bg-black/40 text-white rounded p-3"
        />
        <input
          name="time"
          type="time"
          onChange={handleChange}
          required
          className="border border-white/10 bg-black/40 text-white rounded p-3"
        />
        <input
          name="passengers"
          type="number"
          min="1"
          defaultValue="1"
          onChange={handleChange}
          className="border border-white/10 bg-black/40 text-white rounded p-3"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          Montant estimé :{" "}
          <strong className="text-pdhb-gold">
            {(form.priceCents / 100).toFixed(2)} €
          </strong>
        </div>
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Redirection…" : "Payer & Réserver"}
        </button>
      </div>

      <p className="text-xs text-white/50 mt-3">
        Zones desservies : Ain, Lyon, Genève
      </p>
    </form>
  );
}
