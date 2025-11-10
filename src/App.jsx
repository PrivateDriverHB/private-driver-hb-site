import React from "react";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center font-sans"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605559424843-1f13f83baf19?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-2xl text-center backdrop-blur-sm">
        <h1 className="text-5xl font-semibold tracking-wide mb-4">
          Private Driver <span className="text-gray-400">HB</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
          Confort, discrétion et élégance à bord d’une Audi A4 — votre chauffeur
          privé haut de gamme pour tous vos déplacements.
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition duration-300">
          Réserver maintenant
        </button>
      </div>
    </div>
  );
}

export default App;

