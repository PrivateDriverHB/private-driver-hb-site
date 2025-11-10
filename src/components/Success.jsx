// src/components/Success.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-pdhb-gold">
          Paiement réussi ✅
        </h1>
        <p className="mb-6 text-white/80">
          Merci pour votre réservation avec <strong>Private Driver HB</strong>.
          Tu vas recevoir une confirmation par e-mail.
        </p>

        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block px-5 py-3 bg-pdhb-gold text-black rounded-lg font-medium"
          >
            Retour à l’accueil
          </Link>

          <Link
            to="/booking"
            className="inline-block px-5 py-3 border border-white/10 rounded-lg text-white/90"
          >
            Faire une autre réservation
          </Link>
        </div>
      </div>
    </main>
  );
}
