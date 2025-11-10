import { useState } from "react";

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    from: "",
    to: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const booking = { ...form, priceCents: 4500 }; // exemple 45€

      const res = await fetch("http://localhost:5174/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking }),
      });

      const data = await res.json();

      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else {
        throw new Error("Erreur de session Stripe");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau ou serveur Stripe.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#111",
        color: "white",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h2>Réserver & payer en ligne</h2>

      <input
        type="text"
        name="name"
        placeholder="Nom complet"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="from"
        placeholder="Adresse de départ"
        value={form.from}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="to"
        placeholder="Adresse d'arrivée"
        value={form.to}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "1rem",
          background: "#fcbf49",
          border: "none",
          padding: "0.8rem 1.2rem",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Redirection..." : "Réserver"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </form>
  );
}

export default BookingForm;

