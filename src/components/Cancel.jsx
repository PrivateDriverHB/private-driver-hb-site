// src/components/Cancel.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Paiement annulé</h1>
        <p className="mb-6 text-white/80">
          La transaction a été annulée ou n’a pas pu être finalisée. Tu peux réessayer.
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
            Réessayer la réservation
          </Link>
        </div>
      </div>
    </main>
  );
}
